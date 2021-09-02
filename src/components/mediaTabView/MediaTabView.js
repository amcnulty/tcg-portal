import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { TAB_PAYMENT, TAB_UNIT } from '../../shared/Constants';
import { HELPERS, TOAST_TYPES } from '../../util/helpers';
import TabView from '../tabView/TabView';
import './MediaTabView.sass';
import Compress from 'compress.js';
import { API } from '../../util/API';
import { AppContext } from '../../context/Store';
import { UPDATE_PREVIEW } from '../../context/ActionTypes';
import ImageCard from '../imageCard/ImageCard';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const MediaTabView = ({location}) => {
    const [state, dispatch] = useContext(AppContext);

    const [detailPageImages, setDetailPageImages] = useState();
    const [bannerImage, setBannerImage] = useState();

    // State for new image object being created before it is uploaded
    const [detailPageImages_pending, setDetailPageImages_pending] = useState();
    const [currentImage, setCurrentImage] = useState();
    const [currentCaption, setCurrentCaption] = useState();
    const [isEditing_pending, setIsEditing_pending] = useState(false);
    const [editingIndex_pending, setEditingIndex_pending] = useState(-1);

    // State for new banner image being created before it is uploaded
    const [bannerImage_pending, setBannerImage_pending] = useState();

    // Modal state
    const [captionModal, setCaptionModal] = useState(false);
    const [captionModalPage, setCaptionModalPage] = useState(1);
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(-1);

    const compress = new Compress();
    /**
     * Every time a field changes update the preview so when this tab is exited the preview retains its data.
     */
    useEffect(() => {
        updatePreview();
    }, [detailPageImages, bannerImage]);

    useEffect(() => {
        const locationWithChanges = {
            ...location,
            ...state.previewLocation
        };
        setDetailPageImages(locationWithChanges.detailPageImages ? locationWithChanges.detailPageImages : '');
        setBannerImage(locationWithChanges.bannerImage ? locationWithChanges.bannerImage : '');
    }, [location]);
    
    const handleFormSubmit = e => {
        // if (!e.target.checkValidity()) {
        //     e.preventDefault();
        //     e.stopPropagation();
        // }
        // else {
            e.preventDefault();
            API.updateLocation(state.previewLocation, (res, err) => {
                if (res && res.status === 200) {
                    console.log('success!');
                }
                else if (err) {
                    console.log(err);
                }
            });
        // }
    }
    /**
     * Updates the preview in context so when it is time to show the preview data from this tab will be included.
     */
    const updatePreview = () => {
        const previewLocation = {
            ...(detailPageImages) && {detailPageImages},
            ...(bannerImage) && {bannerImage}
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
                maxWidth: 1920,
                maxHeight: 1080
            })
            .then(data => {
                const resizedimage = data[0];
                const resizedFile = Compress.convertBase64ToFile(resizedimage.data, resizedimage.ext);
                console.log(resizedFile);
                setCurrentImage(resizedFile);

                // Open caption modal
                toggleCaptionModal();



                // API.uploadImage(resizedFile, (res, err) => {
                //     if (res && res.status === 200) {
                //         console.log('res :>> ', res);
                //     }
                //     else {
                //         console.log('err :>> ', err);
                //         console.log('err.response :>> ', err.response);
                //     }
                // })
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
    
    const toggleCaptionModal = () => {
        if (captionModal) {
            resetCaptionModal();
        }
        setCaptionModal(!captionModal);
    }

    const resetCaptionModal = () => {
        setCurrentCaption('');
        setIsEditing(false);
        setEditingIndex(-1);
        setCaptionModalPage(1);
        setIsEditing_pending(false);
        setEditingIndex_pending(-1);
    }

    const handleBannerClick_modalPage = () => {
        const newBannerImage = {
            ...(currentImage && {file: currentImage}),
            ...(currentImage && {src: URL.createObjectURL(currentImage)})
        };
        setBannerImage_pending(newBannerImage);
        toggleCaptionModal();
    }

    const handleLocaionImageClick_modalPage = () => {
        setCaptionModalPage(2);
    }

    const handleEdit = index => {
        if (detailPageImages[index]) {
            setCurrentCaption(detailPageImages[index].alt);
            setIsEditing(true);
            setEditingIndex(index);
            toggleCaptionModal();
        }
    }

    const handleDelete = index => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            const newDetailPageImages = [...detailPageImages];
            newDetailPageImages.splice(index, 1);
            setDetailPageImages(newDetailPageImages);
        }
    }

    const handleBanner_pendingDelete = () => {
        if (window.confirm('Are you sure you want to delete this banner image?')) {
            setBannerImage_pending();
        }
    }

    const handleUpdateCaption = () => {
        if (isEditing) {
            const newDetailPageImage = {
                ...(currentCaption && {alt: currentCaption}),
                ...(detailPageImages[editingIndex].src && {src: detailPageImages[editingIndex].src}),
                ...(detailPageImages[editingIndex].thumbnail && {thumbnail: detailPageImages[editingIndex].thumbnail})
            };
            const newDetailPageImages = [...detailPageImages];
            newDetailPageImages.splice(editingIndex, 1, newDetailPageImage);
            setDetailPageImages(newDetailPageImages);
            toggleCaptionModal();
        }
        else if (isEditing_pending) {
            const newDetailPageImage = {
                ...(currentCaption && {alt: currentCaption}),
                ...(detailPageImages_pending[editingIndex_pending].src && {src: detailPageImages_pending[editingIndex_pending].src}),
                ...(detailPageImages_pending[editingIndex_pending].file && {file: detailPageImages_pending[editingIndex_pending].file})
            };
            const newDetailPageImages_pending = [...detailPageImages_pending];
            newDetailPageImages_pending.splice(editingIndex_pending, 1, newDetailPageImage);
            setDetailPageImages_pending(newDetailPageImages_pending);
            toggleCaptionModal();
        }
    }
    
    const handleAddCaption = () => {
        const newDetailPageImage = {
            ...(currentCaption && {alt: currentCaption}),
            ...(currentImage && {file: currentImage}),
            ...(currentImage && {src: URL.createObjectURL(currentImage)})
        };
        let newDetailPageImages_pending = [];
        if (detailPageImages_pending) {
            newDetailPageImages_pending = [...detailPageImages_pending];
        }
        newDetailPageImages_pending.push(newDetailPageImage);
        setDetailPageImages_pending(newDetailPageImages_pending);
        toggleCaptionModal();
    }

    const handlePendingEdit = index => {
        if (detailPageImages_pending[index]) {
            setCurrentCaption(detailPageImages_pending[index].alt);
            setIsEditing_pending(true);
            setEditingIndex_pending(index);
            setCaptionModalPage(2);
            toggleCaptionModal();
        }
    }

    const handlePendingDelete = index => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            const newDetailPageImages_pending = [...detailPageImages_pending];
            newDetailPageImages_pending.splice(index, 1);
            setDetailPageImages_pending(newDetailPageImages_pending);
        }
    }

    return (
        <div className='MediaTabView'>
            <TabView
                header={`Media Upload ${location.name ? '- ' + location.name : ''}`}
                description='This section is for uploading image media which can have optional caption text that will be shown with the image.'
                previousView={TAB_UNIT}
                nextView={TAB_PAYMENT}
                formId='mediaForm'
                showSaveButton={location.isPublished}
                updatePreview={updatePreview}
            >
                <div className='card editDetailCard p-4'>
                    <form id='mediaForm' onSubmit={handleFormSubmit}>
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
                            (detailPageImages_pending && detailPageImages_pending.length > 0 || bannerImage_pending) &&
                            <>
                                <h5 className="mt-5">Images Pending Save</h5>
                                <p>The following images will be uploaded once the location is saved with the <b>Save</b> button below.</p>
                                <div className="row">
                                    {
                                        bannerImage_pending &&
                                        <div className="col-12 mb-4">
                                            <ImageCard
                                                src={bannerImage_pending.src}
                                                caption='Banner'
                                                hideEdit
                                                onDelete={handleBanner_pendingDelete}
                                            />
                                        </div>
                                    }
                                    {
                                        detailPageImages_pending && detailPageImages_pending.map((image, index) => (
                                            <div className="col-12 col-lg-6 mb-4" key={index}>
                                                <ImageCard
                                                    src={image.src}
                                                    caption={image.alt}
                                                    onEdit={() => handlePendingEdit(index)}
                                                    onDelete={() => handlePendingDelete(index)}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            </>
                        }
                        <h5 className='mt-5'>Banner Image</h5>
                        <p>An optional banner image can be shown at the top of the page for each location.</p>
                        {
                            bannerImage
                            ?
                            <div
                                className="bannerImage card rounded-0 rounded-top"
                                style={{
                                    backgroundImage: `url(${bannerImage.src})`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    height: '30vh'
                                }}
                            >
                                <div className="card-footer position-relative rounded-bottom border">
                                    <button type='button' className="btn btn-link text-danger" onClick={() => {
                                        if (window.confirm('Are you sure you want to delete this banner image?')) {
                                            setBannerImage();
                                        }
                                    }}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                            :
                            <p className="text-secondary pt-5">Currently no banner image has been added. Upload an image with the upload tool above.</p>
                        }
                        <h5 className='mt-5'>Location Images</h5>
                        <p>These are the images that are shown in the slider at the bottom of the location detail page. Here you can edit the caption text, delete images, and upload new ones using the upload tool above.</p>
                        {
                            !detailPageImages || (detailPageImages && detailPageImages.length === 0)
                            ?
                            <p className="text-secondary pt-5">Currently no location images have been added. Upload images with the upload tool above.</p>
                            :
                            <div className="row">
                                {
                                    detailPageImages.map((image, index) => (
                                        <div className="col-12 col-lg-6 mb-4" key={index}>
                                            <ImageCard
                                                src={image.src}
                                                caption={image.alt}
                                                onEdit={() => handleEdit(index)}
                                                onDelete={() => handleDelete(index)}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    </form>
                </div>
            </TabView>
            <Modal isOpen={captionModal} toggle={toggleCaptionModal} centered>
                <ModalHeader>
                    {
                        captionModalPage === 1
                        ?
                        'Select Image Type'
                        :
                        `${isEditing ? 'Edit' : 'Add'} Caption Text`
                    }
                </ModalHeader>
                <ModalBody>
                    {
                        captionModalPage === 1
                        ?
                        <div className='text-center'>
                            <p>What type of image is this?</p>
                            <button className="btn btn-outline-primary me-3" type='button' onClick={handleBannerClick_modalPage}>Banner Image</button>
                            <button className="btn btn-outline-primary" type='button' onClick={handleLocaionImageClick_modalPage}>Location Image</button>
                        </div>
                        :
                        <>
                            <label htmlFor="caption" className="form-label">Image Caption</label>
                            <textarea
                                id="caption"
                                className='form-control'
                                rows="4"
                                placeholder='Enter Caption'
                                value={currentCaption}
                                onChange={e => setCurrentCaption(e.target.value)}
                            />
                        </>
                    }
                </ModalBody>
                <ModalFooter>
                    <button className="btn" onClick={toggleCaptionModal}>CANCEL</button>
                    {
                        captionModalPage === 2 &&
                        (isEditing || isEditing_pending
                        ?
                        <button className="btn btn-primary" onClick={handleUpdateCaption}>Update</button>
                        :
                        <button className="btn btn-primary" onClick={handleAddCaption}>Add</button>)
                    }
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default MediaTabView;