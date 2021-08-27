import React, { useContext, useEffect, useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { OPEN_PREVIEW, RESET_PREVIEW, SET_TABVIEW } from '../../context/ActionTypes';
import { AppContext } from '../../context/Store';
import { API } from '../../util/API';
import { HELPERS } from '../../util/helpers';

const TabView = props => {
    const [state, dispatch] = useContext(AppContext);
    const [previewModal, setPreviewModal] = useState(false);
    const [previewHref, setPreviewHref] = useState('');


    useEffect(() => {
        if (state.openPreview) {
            API.createPreview({data: JSON.stringify(state.previewLocation)}, (res, err) => {
                if (res && res.status === 200) {
                    setPreviewHref('https://contractorsgarage.com/location/preview/' + res.data._id);
                    togglePreviewModal();
                    dispatch({type: RESET_PREVIEW});
                }
            });
        }
    }, [state.openPreview]);
    
    const togglePreviewModal = () => setPreviewModal(!previewModal);
    
    const handleTabViewNavClick = (e, tabView) => {
        e.preventDefault();
        dispatch({type: SET_TABVIEW, payload: tabView})
    }

    const handlePreviewClick = () => {
        props.updatePreview();
        dispatch({type: OPEN_PREVIEW});
    }

    return (
        <div className='TabView'>
            <div className="mb-5 pb-5">
                <h2 className='my-4'>{props.header}</h2>
                <p>{props.description}</p>
                {props.children}
                <div className="card p-4 mt-4">
                    <div>
                        {
                            props.showSaveButton && <button form={props.formId} type='submit'  className="btn btn-primary">Save</button>
                        }
                        <button className="btn btn-secondary ms-2" onClick={handlePreviewClick}>Preview</button>
                    </div>
                </div>
                <div className="tabViewNavSection d-flex justify-content-between my-5">
                    {
                        props.previousView &&
                        <div className='card p-3'>
                            <a
                                href='/'
                                onClick={e => handleTabViewNavClick(e, props.previousView)}
                            >
                                <i className="fas fa-arrow-left"></i> Previous: {HELPERS.getTabNameFromTabView(props.previousView)}
                            </a>
                        </div>
                    }
                    {
                        props.nextView &&
                        <div className='ms-auto card p-3'>
                            <a
                                href='/'
                                onClick={e => handleTabViewNavClick(e, props.nextView)}
                            >
                                Next: {HELPERS.getTabNameFromTabView(props.nextView)} <i className="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    }
                </div>
            </div>
            <Modal isOpen={previewModal} toggle={togglePreviewModal}>
                <ModalHeader>Location Preview Generated</ModalHeader>
                <ModalBody>
                    <p>A preview has been generated from your data for this location. The link below will open the preview in a new tab. <b>This link will expire in 30 minutes.</b></p>
                    <a href={previewHref} target='_blank'>View Preview <i className="fas fa-external-link-alt"></i></a>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={togglePreviewModal}>Close</button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default TabView;