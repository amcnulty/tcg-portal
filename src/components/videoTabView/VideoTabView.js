import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState
} from 'react';
import { useDropzone } from 'react-dropzone';
import { SET_VIDEO_PENDING, UPDATE_PREVIEW } from '../../context/ActionTypes';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { AppContext } from '../../context/Store';
import { TAB_MEDIA, TAB_PAYMENT } from '../../shared/Constants';
import { HELPERS, TOAST_TYPES } from '../../util/helpers';
import TabView from '../tabView/TabView';
import VideoCard from '../videoCard/VideoCard';
import './VideoTabView.sass';
import { API } from '../../util/API';

const VideoTabView = ({ location }) => {
    const [state, dispatch] = useContext(AppContext);

    const [detailPageVideos, setDetailPageVideos] = useState();
    const [showLoader, setShowLoader] = useState(false);
    const [isPublished, setIsPublished] = useState();

    // State for new video object being created before it is uploaded
    const [currentVideo, setCurrentVideo] = useState();
    const [currentPoster, setCurrentPoster] = useState();
    const [isEditing_pending, setIsEditing_pending] = useState(false); // Flag for editing a pending video
    const [editingIndex_pending, setEditingIndex_pending] = useState(-1);

    // Editing modal state
    const [showPosterModal, setShowPosterModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(-1);

    // Ref for tracking which existing videos' poster have been updated
    const updatedPostersToVideoIdMap = useRef({});

    /**
     * Every time a field changes, update the preview, so when this tab is exited the preview retains its data.
     */
    useEffect(() => {
        updatePreview();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detailPageVideos, isPublished]);

    useEffect(() => {
        const locationWithChanges = {
            ...location,
            ...state.previewLocation
        };
        setDetailPageVideos(
            locationWithChanges.detailPageVideos
                ? locationWithChanges.detailPageVideos
                : undefined
        );
        setIsPublished(
            locationWithChanges.isPublished
                ? locationWithChanges.isPublished
                : null
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const handleFormSubmit = (e, publish) => {
        e.preventDefault();
        if (state.previewLocation._id) {
            HELPERS.showToast(TOAST_TYPES.INFO, 'Video Upload Started');
            setShowLoader(true);
            // First update the location data.
            // The server will be responsible for deleting any videos or poster images that are no longer in the new request.
            const updateRequest = {
                ...state.previewLocation,
                ...(publish && { isPublished: true, isDraft: false })
            };
            const posterUpdateKeys = Object.keys(
                updatedPostersToVideoIdMap.current
            );
            for (let i = 0; i < posterUpdateKeys.length; i++) {
                updateRequest.detailPageVideos.find(
                    (video) => video._id === posterUpdateKeys[i]
                ).poster = undefined;
            }
            API.updateLocation_hideToast(updateRequest, (res, err) => {
                if (res && res.status === 200) {
                    if (
                        state.videos_pending ||
                        Object.keys(updatedPostersToVideoIdMap.current).length >
                            0
                    ) {
                        const videoFiles = state.videos_pending
                            ? state.videos_pending.map(
                                  (video) => video.video.file
                              )
                            : [];
                        const imageFiles = state.videos_pending
                            ? state.videos_pending
                                  .filter((video) => !!video.poster.file)
                                  .map((video) => video.poster.file)
                            : [];
                        // we might already have a variable that's tracking the list of video files
                        const posterUpdateFiles = posterUpdateKeys.map(
                            (key) => updatedPostersToVideoIdMap.current[key]
                        );
                        let videoResolver;
                        let imageResolver;
                        let posterUpdateResolver;
                        const videoLoader = new Promise((resolve, reject) => {
                            videoResolver = resolve;
                        });
                        const imageLoader = new Promise((resolve, reject) => {
                            imageResolver = resolve;
                        });
                        // Add another loader for poster images on existing videos
                        const posterImageLoader = new Promise(
                            (resolve, reject) => {
                                posterUpdateResolver = resolve;
                            }
                        );
                        API.uploadVideos(videoFiles, (res, err) => {
                            if (res) {
                                videoResolver(res);
                            } else if (err) {
                                console.log(err);
                            }
                        });
                        API.uploadImages(imageFiles, (res, err) => {
                            if (res) {
                                imageResolver(res);
                            } else if (err) {
                                console.log(err);
                            }
                        });
                        // Upload the updated poster image files
                        API.uploadImages(posterUpdateFiles, (res, err) => {
                            if (res) {
                                posterUpdateResolver(res);
                            } else if (err) {
                                console.log(err);
                            }
                        });
                        Promise.all([
                            videoLoader,
                            imageLoader,
                            posterImageLoader
                        ]).then(
                            ([
                                videoResponses,
                                imageResponses,
                                posterUpdateResponses
                            ]) => {
                                const locationVideosRequest = {
                                    _id: state.previewLocation._id,
                                    detailPageVideos: []
                                };
                                if (state.videos_pending) {
                                    for (
                                        let i = 0;
                                        i < state.videos_pending.length;
                                        i++
                                    ) {
                                        locationVideosRequest.detailPageVideos.push(
                                            {
                                                src: videoResponses[i].data
                                                    .secure_url,
                                                ...(state.videos_pending[i]
                                                    .poster.file && {
                                                    poster: imageResponses.shift()
                                                        .data.secure_url
                                                })
                                            }
                                        );
                                    }
                                }
                                // Before doing this add the newly uploaded poster image to the matching existing detailPageVideo
                                for (
                                    let i = 0;
                                    i < posterUpdateKeys.length;
                                    i++
                                ) {
                                    detailPageVideos.find(
                                        (video) =>
                                            video._id === posterUpdateKeys[i]
                                    ).poster =
                                        posterUpdateResponses[
                                            i
                                        ].data.secure_url;
                                }
                                locationVideosRequest.detailPageVideos =
                                    locationVideosRequest.detailPageVideos.concat(
                                        detailPageVideos
                                    );
                                API.updateLocation_hideToast(
                                    locationVideosRequest,
                                    (res, err) => {
                                        if (res && res.status === 200) {
                                            if (publish) {
                                                setIsPublished(true);
                                                HELPERS.showToast(
                                                    TOAST_TYPES.SUCCESS,
                                                    'Location Published!'
                                                );
                                            } else {
                                                HELPERS.showToast(
                                                    TOAST_TYPES.SUCCESS,
                                                    'Update Successful!'
                                                );
                                            }
                                            setDetailPageVideos(
                                                locationVideosRequest.detailPageVideos
                                            );
                                            setShowLoader(false);
                                            dispatch({
                                                type: SET_VIDEO_PENDING,
                                                payload: undefined
                                            });
                                        } else if (err) {
                                            console.log(err);
                                            setShowLoader(false);
                                        }
                                    }
                                );
                            }
                        );
                    } else {
                        if (publish) {
                            setIsPublished(true);
                            HELPERS.showToast(
                                TOAST_TYPES.SUCCESS,
                                'Location Published!'
                            );
                            setShowLoader(false);
                        } else {
                            HELPERS.showToast(
                                TOAST_TYPES.SUCCESS,
                                'Update Successful!'
                            );
                            setShowLoader(false);
                        }
                    }
                } else if (err) {
                    console.log(err);
                    setShowLoader(false);
                }
            });
        } else {
            console.log('place for create');
        }
    };

    /**
     * Updates the preview in context, so when it's time to show the preview, data from this tab will be included.
     */
    const updatePreview = () => {
        const previewLocation = {
            ...(detailPageVideos && { detailPageVideos }),
            ...(isPublished != null && { isPublished })
        };
        const payload = {
            ...location,
            ...state.previewLocation,
            ...previewLocation
        };
        dispatch({ type: UPDATE_PREVIEW, payload: payload });
    };

    const handlePublish = (e) => {
        e.preventDefault();
        handleFormSubmit(e, true);
    };

    const resetPosterModal = useCallback(() => {
        setCurrentVideo(undefined);
        setCurrentPoster(undefined);
        setIsEditing(false);
        setEditingIndex(-1);
        setIsEditing_pending(false);
        setEditingIndex_pending(-1);
    }, []);

    const togglePosterModal = useCallback(() => {
        setShowPosterModal((val) => {
            val && resetPosterModal();
            return !val;
        });
    }, [resetPosterModal]);

    const onVideoDrop = useCallback(
        (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                // setCurrentVideo(acceptedFiles[0]);
                setCurrentVideo({
                    file: acceptedFiles[0],
                    url: URL.createObjectURL(acceptedFiles[0])
                });
                togglePosterModal();
            }
        },
        [togglePosterModal]
    );

    const onVideoDropRejected = (event) => {
        const message =
            event[0]?.errors[0].code && event[0].errors[0].message
                ? 'Warning! ' +
                  event[0].errors[0].code +
                  ' ' +
                  event[0].errors[0].message
                : 'Warning! Cannot upload file. Video must be .mp4 format and less than 100MB in size';
        HELPERS.showToast(TOAST_TYPES.WARNING, message);
    };

    const onImageDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            // reset the poster to undefined then on next render set the poster.
            // This allows the video element to actually update the poster.
            setCurrentPoster();
            requestAnimationFrame(() =>
                setCurrentPoster({
                    file: acceptedFiles[0],
                    url: URL.createObjectURL(acceptedFiles[0])
                })
            );
        }
    }, []);

    const onImageDropRejected = useCallback((event) => {
        HELPERS.showToast(
            TOAST_TYPES.WARNING,
            'Warning! Cannot upload file because it is not the correct file type! Image must be .jpg or .png'
        );
    }, []);

    const {
        getRootProps: getVideoRootProps,
        getInputProps: getVideoInputProps
    } = useDropzone({
        onDrop: onVideoDrop,
        onDropRejected: onVideoDropRejected,
        maxFiles: 1,
        maxSize: 100000000,
        accept: 'video/mp4'
    });

    const {
        getRootProps: getImageRootProps,
        getInputProps: getImageInputProps
    } = useDropzone({
        onDrop: onImageDrop,
        onDropRejected: onImageDropRejected,
        maxFiles: 1,
        accept: 'image/jpeg, image/png'
    });

    const handleEdit = (index) => {
        if (detailPageVideos[index]) {
            setCurrentVideo({ url: detailPageVideos[index].src });
            setCurrentPoster({ url: detailPageVideos[index].poster });
            setIsEditing(true);
            setEditingIndex(index);
            togglePosterModal();
        }
    };

    const handleDelete = (index) => {
        if (window.confirm('Are you sure you want to delete this video?')) {
            const newDetailPageVideos = [...detailPageVideos];
            newDetailPageVideos.splice(index, 1);
            setDetailPageVideos(newDetailPageVideos);
        }
    };

    const handleReorder = (index) => {
        console.log('index :>> ', index);
    };

    const handleUpdatePoster = () => {
        if (isEditing) {
            if (currentPoster?.file) {
                updatedPostersToVideoIdMap.current[
                    detailPageVideos[editingIndex]._id
                ] = currentPoster.file;
            } else {
                delete updatedPostersToVideoIdMap.current[
                    detailPageVideos[editingIndex]._id
                ];
            }
            const newVideo = {
                _id: detailPageVideos[editingIndex]._id,
                src: detailPageVideos[editingIndex].src,
                poster: currentPoster?.url
            };
            const newDetialPageVideos = [...detailPageVideos];
            newDetialPageVideos.splice(editingIndex, 1, newVideo);
            setDetailPageVideos(newDetialPageVideos);
            togglePosterModal();
        } else if (isEditing_pending) {
            const newVideo = {
                video: currentVideo,
                poster: {
                    file: currentPoster?.file,
                    url: currentPoster?.url
                }
            };
            const newVideos_pending = [...state.videos_pending];
            newVideos_pending.splice(editingIndex_pending, 1, newVideo);
            dispatch({ type: SET_VIDEO_PENDING, payload: newVideos_pending });
            togglePosterModal();
        }
    };

    const handleAddPoster = () => {
        const newVideo = {
            video: {
                file: currentVideo.file,
                url: currentVideo.url
            },
            poster: {
                file: currentPoster?.file,
                url: currentPoster?.url
            }
        };
        let newVideos_pending = [];
        if (state.videos_pending) {
            newVideos_pending = [...state.videos_pending];
        }
        newVideos_pending.push(newVideo);
        dispatch({
            type: SET_VIDEO_PENDING,
            payload: newVideos_pending
        });
        togglePosterModal();
    };

    const handlePendingEdit = (index) => {
        if (state.videos_pending[index]) {
            // setCurrentCaption(state.detailPageImages_pending[index].alt);
            setCurrentVideo(state.videos_pending[index].video);
            setCurrentPoster(state.videos_pending[index].poster);
            setIsEditing_pending(true);
            setEditingIndex_pending(index);
            togglePosterModal();
        }
    };

    const handlePendingDelete = (index) => {
        if (window.confirm('Are you sure you want to delete this video?')) {
            const newVideos_pending = [...state.videos_pending];
            newVideos_pending.splice(index, 1);
            dispatch({ type: SET_VIDEO_PENDING, payload: newVideos_pending });
        }
    };

    return (
        <div className='VideoTabView'>
            <TabView
                header={`Video Upload ${
                    state.previewLocation.name
                        ? '- ' + state.previewLocation.name
                        : ''
                }`}
                description="This section allows you to upload videos for display on this location's page. Additionally, you have the option to assign a poster image, which will be presented to viewers before they begin playing the video."
                previousView={TAB_MEDIA}
                nextView={TAB_PAYMENT}
                formId='videoForm'
                isPublished={isPublished}
                updatePreview={updatePreview}
                onPublish={handlePublish}
            >
                <div className='card editDetailCard p-4'>
                    <form id='videoForm' onSubmit={handleFormSubmit}>
                        <div {...getVideoRootProps()} className='dropzone'>
                            <input {...getVideoInputProps()} />
                            <div className='d-flex flex-column align-items-center justify-content-around h-100 py-5 bg-light'>
                                <i className='fas fa-cloud-upload-alt largeText'></i>
                                <h3>Drop Files Here</h3>
                                <p className='text-secondary fw-bold'>
                                    File type must be .mp4
                                </p>
                                <button
                                    type='button'
                                    className='btn btn-outline-primary'
                                >
                                    Browse
                                </button>
                            </div>
                        </div>
                        {state.videos_pending?.length > 0 && (
                            <>
                                <h5 className='mt-5'>Videos Pending Save</h5>
                                <p>
                                    The following videos will be uploaded once
                                    the location is saved with the <b>Save</b>{' '}
                                    button below.
                                </p>
                                <div className='row'>
                                    {state.videos_pending.map(
                                        (video, index) => (
                                            <div
                                                className='col-12 col-lg-6 mb-4'
                                                key={index}
                                            >
                                                <VideoCard
                                                    src={video.video.url}
                                                    poster={video?.poster?.url}
                                                    onEdit={() =>
                                                        handlePendingEdit(index)
                                                    }
                                                    onDelete={() =>
                                                        handlePendingDelete(
                                                            index
                                                        )
                                                    }
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            </>
                        )}
                        <h5 className='mt-5'>Videos</h5>
                        <p>
                            This section features the videos displayed on the
                            location detail page. You have the flexibility to
                            edit a video's poster image, remove existing videos,
                            and upload new ones using the upload tool provided
                            above.
                        </p>
                        {!detailPageVideos ||
                        detailPageVideos & (detailPageVideos.length === 0) ? (
                            <p className='text-secondary pt-5'>
                                Currently no location videos have been added.
                                Upload videos with the upload tool above.
                            </p>
                        ) : (
                            <div className='row'>
                                {detailPageVideos.map((video, index) => (
                                    <div
                                        className='col-12 col-lg-6 mb-4'
                                        key={index}
                                    >
                                        <VideoCard
                                            src={video.src}
                                            poster={video.poster}
                                            onEdit={() => handleEdit(index)}
                                            onDelete={() => handleDelete(index)}
                                            onReorder={() =>
                                                handleReorder(index)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        {showLoader && (
                            <div className='d-flex justify-content-center align-items-center'>
                                <div className='spinner-border' role='status'>
                                    <span className='visually-hidden'>
                                        Loading...
                                    </span>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </TabView>
            <Modal
                isOpen={showPosterModal}
                toggle={togglePosterModal}
                centered
                size='xl'
            >
                <ModalHeader>
                    {`${
                        isEditing || isEditing_pending ? 'Edit' : 'Add'
                    } Video Poster`}
                </ModalHeader>
                <ModalBody>
                    {
                        <>
                            <div {...getImageRootProps()} className='dropzone'>
                                <input {...getImageInputProps()} />
                                <div className='d-flex flex-column align-items-center justify-content-around h-100 py-5 bg-light'>
                                    <i className='fas fa-cloud-upload-alt largeText'></i>
                                    <h3>Drop Files Here</h3>
                                    <p className='text-secondary fw-bold'>
                                        File type must be .jpg or .png
                                    </p>
                                    <button
                                        type='button'
                                        className='btn btn-outline-primary'
                                    >
                                        Browse
                                    </button>
                                </div>
                            </div>
                            <p className='pt-2'>
                                Video posters are captivating images that entice
                                viewers before they commence watching a video.
                                These posters can enhance the visual appeal of
                                your content. If you choose not to select a
                                custom poster, the <b>video's initial frame</b>{' '}
                                will serve as the visual preview in the player
                                before users press play.
                            </p>
                            <p className='p-4 mt-3 bg-warning rounded-3'>
                                <b className='fst-italic'>Note:</b> For optimal
                                results, opt for an image with a 16:9 aspect
                                ratio to match the video's dimensions.
                            </p>
                            <VideoCard
                                src={currentVideo?.url}
                                poster={currentPoster?.url}
                                {...(currentPoster && {
                                    onDelete: () => setCurrentPoster(undefined)
                                })}
                            />
                            {currentPoster && (
                                <p className='mt-2'>
                                    To remove the poster image, simply click on
                                    the delete icon located at the bottom left
                                    of the video panel. Rest assured, this
                                    action only removes the poster image and not
                                    the video itself. Once you are content with
                                    your modifications, proceed by clicking the{' '}
                                    {isEditing || isEditing_pending ? (
                                        <b>Update</b>
                                    ) : (
                                        <b>Add</b>
                                    )}{' '}
                                    button.
                                </p>
                            )}
                        </>
                    }
                </ModalBody>
                <ModalFooter>
                    <button className='btn' onClick={togglePosterModal}>
                        CANCEL
                    </button>
                    {isEditing || isEditing_pending ? (
                        <button
                            className='btn btn-primary'
                            onClick={handleUpdatePoster}
                        >
                            Update
                        </button>
                    ) : (
                        <button
                            className='btn btn-primary'
                            onClick={handleAddPoster}
                        >
                            {currentPoster ? 'Add' : 'Skip'}
                        </button>
                    )}
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default VideoTabView;
