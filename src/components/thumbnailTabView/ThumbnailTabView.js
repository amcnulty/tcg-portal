import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AppContext } from '../../context/Store';
import { TAB_GENERAL, TAB_UNIT } from '../../shared/Constants';
import TabView from '../tabView/TabView';
import Compress from 'compress.js';
import { UPDATE_PREVIEW, SET_THUMBNAIL_IMAGE_PENDING } from '../../context/ActionTypes';
import { HELPERS, TOAST_TYPES } from '../../util/helpers';
import './ThumbnailTabView.sass';
import { API } from '../../util/API';
import { useHistory } from 'react-router-dom';

const ThumbnailTabView = ({location}) => {
    const [state, dispatch] = useContext(AppContext);
    const history = useHistory();

    const [thumbnailImage, setThumbnailImage] = useState();
    const [isPublished, setIsPublished] = useState();
    
    const compress = new Compress();
    /**
     * Every time a field changes update the preview so when this tab is exited the preview retains its data.
     */
    useEffect(() => {
        updatePreview();
    }, [thumbnailImage, isPublished]);

    useEffect(() => {
        const locationWithChanges = {
            ...location,
            ...state.previewLocation
        };
        setThumbnailImage(locationWithChanges.thumbnailImage ? locationWithChanges.thumbnailImage : undefined);
        setIsPublished(locationWithChanges.isPublished ? locationWithChanges.isPublished: null);
    }, [location]);

    const handleFormSubmit = (e, publish) => {
        e.preventDefault();
        if (state.previewLocation._id) {
            const updateRequest = publish
            ?
            {...state.previewLocation, ...(state.previewLocation.thumbnailImage ?? {thumbnailImage: null}), _id: state.previewLocation._id, isPublished: true, isDraft: false}
            :
            {...state.previewLocation, ...(state.previewLocation.thumbnailImage ?? {thumbnailImage: null}), _id: state.previewLocation._id}
            API.updateLocation_hideToast(updateRequest, (res, err) => {
                if (res && res.status === 200) {
                    if (state.thumbnailImage_pending) {
                        API.uploadImages([state.thumbnailImage_pending.file], (res, err) => {
                            if (res) {
                                const locationImageRequest = {
                                    _id: state.previewLocation._id,
                                    thumbnailImage: {
                                        src: res[0].data.secure_url,
                                        alt: state.previewLocation.name
                                    }
                                }
                                API.updateLocation_hideToast(locationImageRequest, (res, err) => {
                                    if (res && res.status === 200) {
                                        console.log('Thumbnail Upload Success!');
                                        if (publish) {
                                            setIsPublished(true);
                                            HELPERS.showToast(TOAST_TYPES.SUCCESS, 'Location Published!');
                                        }
                                        else {
                                            HELPERS.showToast(TOAST_TYPES.SUCCESS, 'Update Successful!');
                                        }
                                        setThumbnailImage(locationImageRequest.thumbnailImage);
                                        dispatch({type: SET_THUMBNAIL_IMAGE_PENDING, payload: undefined});
                                    }
                                    else if (err) {
                                        console.log(err);
                                    }
                                });
                            }
                            else if (err) {
                                console.log(err);
                            }
                        });
                    }
                    else {
                        if (publish) {
                            setIsPublished(true);
                            HELPERS.showToast(TOAST_TYPES.SUCCESS, 'Location Published!');
                        }
                        else {
                            HELPERS.showToast(TOAST_TYPES.SUCCESS, 'Update Successful!');
                        }
                    }
                }
                else if (err) {
                    console.log(err);
                }
            });
        }
        else {
            API.createLocation(state.previewLocation, (res, err) => {
                if (res && res.status === 200) {
                    console.log(res.data);
                    const idField = res.data._id;
                    if (state.thumbnailImage_pending) {
                        API.uploadImages([state.thumbnailImage_pending.file], (res, err) => {
                            if (res) {
                                const locationImageRequest = {
                                    _id: idField,
                                    thumbnailImage: {
                                        src: res[0].data.secure_url,
                                        alt: state.previewLocation.name
                                    }
                                }
                                API.updateLocation_hideToast(locationImageRequest, (res, err) => {
                                    if (res && res.status === 200) {
                                        console.log('Thumbnail Upload Success!');
                                        HELPERS.showToast(TOAST_TYPES.SUCCESS, 'Update Successful!');
                                        setThumbnailImage(locationImageRequest.thumbnailImage);
                                        dispatch({type: SET_THUMBNAIL_IMAGE_PENDING, payload: undefined});
                                        dispatch({type: UPDATE_PREVIEW, payload: res.data});
                                        history.push(`/location/${res.data._id}`);
                                    }
                                    else if (err) {
                                        console.log(err);
                                    }
                                });
                            }
                            else if (err) {
                                console.log(err);
                            }
                        });
                    }
                    else {
                        HELPERS.showToast(TOAST_TYPES.SUCCESS, 'Update Successful!');
                        dispatch({type: UPDATE_PREVIEW, payload: res.data});
                        history.push(`/location/${res.data._id}`);
                    }
                }
                else if (err) {
                    console.log(err);
                }
            });
        }
    }

    const handlePublish = (e) => {
        e.preventDefault();
        handleFormSubmit(e, true);
    }
    /**
     * Updates the preview in context so when it is time to show the preview data from this tab will be included.
     */
    const updatePreview = () => {
        const previewLocation = {
            thumbnailImage,
            ...((isPublished != null) && {isPublished})
        };
        const payload = {
            ...location,
            ...state.previewLocation,
            ...previewLocation
        };
        dispatch({type: UPDATE_PREVIEW, payload: payload});
    }
    
    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length > 0) {
            console.log('accpetedFiles :>> ', acceptedFiles);
            compress.compress(acceptedFiles, {
                size: .4,
                quality: 1,
                maxWidth: 300,
                maxHeight: 280
            })
            .then(data => {
                const resizedimage = data[0];
                const resizedFile = Compress.convertBase64ToFile(resizedimage.data, resizedimage.ext);
                console.log(resizedFile);
                dispatch({type: SET_THUMBNAIL_IMAGE_PENDING, payload: {
                        file: resizedFile,
                        src: URL.createObjectURL(resizedFile),
                        alt: state.previewLocation.name
                    }
                });
            })
        }
    }, []);

    const onDropRejected = event => {
        console.log(event);
        HELPERS.showToast(TOAST_TYPES.WARNING, 'Warning! Cannot upload file because it is not the correct file type! Image must be .jpg or .png');
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        onDropRejected,
        maxFiles: 1,
        accept: 'image/jpeg, image/png'
    });

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            setThumbnailImage();
        }
    }
    
    const handleDelete_pending = () => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            dispatch({type: SET_THUMBNAIL_IMAGE_PENDING, payload: undefined});
        }
    }

    return (
        <div className='ThumbnailTabView'>
            <TabView
                header={`Thumbnail ${state.previewLocation.name ? '- ' + state.previewLocation.name : ''}`}
                description='This section is for editing the thumbnail image that will be shown on the map view when users click on the marker for this location.'
                previousView={TAB_GENERAL}
                nextView={TAB_UNIT}
                formId='thumbnailForm'
                isPublished={isPublished}
                updatePreview={updatePreview}
                onPublish={handlePublish}
            >
                <div className='card editDetailCard p-4'>
                    <form id='thumbnailForm' onSubmit={handleFormSubmit}>
                        <div {...getRootProps()} className='dropzone'>
                            <input {...getInputProps()} />
                            <div className="d-flex flex-column align-items-center justify-content-around h-100 py-5 bg-light">
                                <i className="fas fa-cloud-upload-alt largeText"></i>
                                <h3>Drop Files Here</h3>
                                <p className='text-secondary fw-bold'>File types must be .jpg or .png</p>
                                <button type="button" className="btn btn-outline-primary">Browse</button>
                            </div>
                        </div>
                        {
                            state.thumbnailImage_pending &&
                            <>
                                <h5 className='mt-5'>Images Pending Save</h5>
                                <p>The following images will be uploaded once the location is saved with the <b>Save</b> button below. Thumbnail images uploaded here will replace any existing thumbnail image shown below.</p>
                                <div className="thumbnailCard card mb-4">
                                    <div className='card-body'>
                                        <img src={state.thumbnailImage_pending.src} alt={state.thumbnailImage_pending.alt} />
                                    </div>
                                    <div className="card-footer">
                                        <button type='button' className="btn btn-link text-danger" onClick={handleDelete_pending}>
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            </>
                        }
                        <h5 className='mt-5'>Thumbnail Image</h5>
                        <p>A thumbnail image can be shown on the map when a location marker is clicked. To change this image use the upload tool above. This new image will replace the current thumbnail image once the location is saved.</p>
                        {
                            thumbnailImage
                            ?
                            <div className="thumbnailCard card mb-4">
                                <div className='card-body'>
                                    <img src={thumbnailImage.src} alt={thumbnailImage.alt} />
                                </div>
                                <div className="card-footer">
                                    <button type='button' className="btn btn-link text-danger" onClick={handleDelete}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                            :
                            <p className="text-secondary pt-5">Currently no thumbnail image has been added. Upload an image with the upload tool above.</p>
                        }
                    </form>
                </div>
            </TabView>
        </div>
    );
};

export default ThumbnailTabView;