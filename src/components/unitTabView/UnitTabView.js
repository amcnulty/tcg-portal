import React, { useContext, useEffect, useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { UPDATE_PREVIEW } from '../../context/ActionTypes';
import { AppContext } from '../../context/Store';
import { TAB_MEDIA, TAB_THUMBNAIL } from '../../shared/Constants';
import { API } from '../../util/API';
import TabView from '../tabView/TabView';

const UnitTabView = ({location}) => {
    const [state, dispatch] = useContext(AppContext);

    // location fields
    const [unitSummary, setUnitSummary] = useState([]);

    // Fields for unit summary creation modal
    const [unitName_create, setUnitName_create] = useState('');
    const [monthlyRent_create, setMonthlyRent_create] = useState('');
    const [width_create, setWidth_create] = useState('');
    const [height_create, setHeight_create] = useState('');
    const [depth_create, setDepth_create] = useState('');
    const [sqft_create, setSqft_create] = useState('');
    const [numberOfUnits_create, setNumberOfUnits_create] = useState('');
    
    // Fields for unit available modal
    const [unitName_available, setUnitName_available] = useState('');
    const [monthlyRent_available, setMonthlyRent_available] = useState('');
    const [width_available, setWidth_available] = useState('');
    const [height_available, setHeight_available] = useState('');
    const [depth_available, setDepth_available] = useState('');
    const [sqft_available, setSqft_available] = useState('');


    // form state
    const [wasValidated, setWasValidated] = useState(false);

    // unit summary state
    const [unitSummaryModal, setUnitSummaryModal] = useState(false);
    const [isEditing_summary, setIsEditing_summary] = useState(false);
    const [editingIndex_summary, setEditingIndex_summary] = useState(-1);
    
    // unit availability state
    const [unitAvailableModal, setUnitAvailableModal] = useState(false);
    const [isEditing_available, setIsEditing_available] = useState(false);
    const [editingIndex_available, setEditingIndex_available] = useState(-1);
    const [availableModalPage, setAvailableModalPage] = useState(1);
    const [existingUnit, setExistingUnit] = useState('');
    

    /**
     * Every time a field changes update the preview so when this tab is exited the preview retains its data.
     */
    useEffect(() => {
        return () => {
            updatePreview();
        }
    }, [unitSummary]);

    useEffect(() => {
        setUnitSummary(location.unitSummary ? location.unitSummary : []);
    }, [location]);

    const handleFormSubmit = e => {
        if (!e.target.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            e.preventDefault();
            // Try to update the item and if the slug is already taken show error message.
            const requestObject = {
                _id: location._id
            };
            API.updateLocation(requestObject, (res, err) => {
                if (res && res.status === 200) {
                    console.log('success!');
                }
                else if (err) {
                    console.log(err);
                }
            });
        }
        setWasValidated(true);
    }
    /**
     * Updates the preview in context so when it is time to show the preview data from this tab will be included.
     */
    const updatePreview = () => {
        const previewLocation = {
            
        };
        const payload = {
            ...state.previewLocation,
            ...previewLocation
        };
        dispatch({type: UPDATE_PREVIEW, payload: payload});
    }

    /*
    *          !!##########################!!
    *          !!                          !!
    *          !!       Unit Summary       !!
    *          !!                          !!
    *          !!##########################!!
    */

    /**
     * Event handler for creating a new unit summary
     */
    const handleCreateUnitSummary = () => {
        const newUnit = {
        ...(unitName_create && {unitName: unitName_create}),
        ...(monthlyRent_create && {monthlyRent: monthlyRent_create}),
        ...(width_create && {width: width_create}),
        ...(height_create && {height: height_create}),
        ...(depth_create && {depth: depth_create}),
        ...(sqft_create && {squareFeet: sqft_create}),
        ...(numberOfUnits_create && {numberOfUnitsByType: numberOfUnits_create})
        };
        setUnitSummary(unitSummary.concat(newUnit));
        toggleUnitSummaryModal();
    }
    
    const handleUpdateUnitSummary = () => {
        const newUnit = {
        ...(unitName_create && {unitName: unitName_create}),
        ...(monthlyRent_create && {monthlyRent: monthlyRent_create}),
        ...(width_create && {width: width_create}),
        ...(height_create && {height: height_create}),
        ...(depth_create && {depth: depth_create}),
        ...(sqft_create && {squareFeet: sqft_create}),
        ...(numberOfUnits_create && {numberOfUnitsByType: numberOfUnits_create})
        };
        const newUnitSummarys = [...unitSummary];
        newUnitSummarys.splice(editingIndex_summary, 1, newUnit);
        setUnitSummary(newUnitSummarys);
        toggleUnitSummaryModal();
    }

    const handleEditUnitSummary = index => {
        if (unitSummary[index]) {
            setUnitName_create(unitSummary[index].unitName);
            setMonthlyRent_create(unitSummary[index].monthlyRent);
            setWidth_create(unitSummary[index].width);
            setHeight_create(unitSummary[index].height);
            setDepth_create(unitSummary[index].depth);
            setSqft_create(unitSummary[index].squareFeet);
            setNumberOfUnits_create(unitSummary[index].numberOfUnitsByType);
            setIsEditing_summary(true);
            setEditingIndex_summary(index);
            toggleUnitSummaryModal();
        }
    }

    const handleDeleteUnitSummary = index => {
        if (window.confirm('Are you sure you want to delete this unit summary?')) {
            const newUnitSummarys = [...unitSummary];
            newUnitSummarys.splice(index, 1);
            setUnitSummary(newUnitSummarys);
        }
    }

    const toggleUnitSummaryModal = () => {
        if (unitSummaryModal) {
            resetUnitSummaryModal();
        }
        setUnitSummaryModal(!unitSummaryModal);
    }

     const resetUnitSummaryModal = () => {
        setUnitName_create('');
        setMonthlyRent_create('');
        setWidth_create('');
        setHeight_create('');
        setDepth_create('');
        setSqft_create('');
        setNumberOfUnits_create('');
        setIsEditing_summary(false);
        setEditingIndex_summary(-1);
    }

    
    /*
    *          !!###########################!!
    *          !!                           !!
    *          !!     Unit Availability     !!
    *          !!                           !!
    *          !!###########################!!
    */

    const toggleUnitAvailableModal = () => {
        if (unitAvailableModal) {
            resetUnitAvailableModal();
        }
        setUnitAvailableModal(!unitAvailableModal);
    }

    const resetUnitAvailableModal = () => {
        setUnitName_available('');
        setMonthlyRent_available('');
        setWidth_available('');
        setHeight_available('');
        setDepth_available('');
        setSqft_available('');
        setIsEditing_available(false);
        setEditingIndex_available(-1);
        setAvailableModalPage(1);
        setExistingUnit('');
    }

    const handleNextClickAvailableModal = () => {
        setAvailableModalPage(2);
        setUnitName_available(existingUnit.unitName ? existingUnit.unitName : '');
        setMonthlyRent_available(existingUnit.monthlyRent ? existingUnit.monthlyRent : '');
        setWidth_available(existingUnit.width ? existingUnit.width : '');
        setHeight_available(existingUnit.height ? existingUnit.height : '');
        setDepth_available(existingUnit.depth ? existingUnit.depth : '');
        setSqft_available(existingUnit.squareFeet ? existingUnit.squareFeet : '');
    }

    const handleUpdateUnitAvailable = () => {

    }

    const handleAddUnitAvailable = () => {

    }

    return (
        <div className='UnitTabView'>
            <TabView
                header='Unit Information'
                description='This section is for editing unit information including a summary of the units at this location and a list of what units are currently available.'
                previousView={TAB_THUMBNAIL}
                nextView={TAB_MEDIA}
                formId='unitForm'
                showSaveButton={location.isPublished}
                updatePreview={updatePreview}
            >
                <div className='card editDetailCard p-4 my-4'>
                    <form id='unitForm' className={`needs-validation ${wasValidated ? 'was-validated' : ''}`} onSubmit={handleFormSubmit} noValidate>
                        <h5>Unit Summary</h5>
                        <p>Use this section for filling out the unit summary information. This is a description of what types and sizes of units are at this location.</p>
                        <div className="d-flex flex-column my-4">
                            <small className='text-secondary'>Add a unit type with the <b>Add Unit</b> button. All unit types will be displayed below.</small>
                            <div>
                                <button type='button' className="btn btn-outline-primary" onClick={toggleUnitSummaryModal}>Add Unit</button>
                            </div>
                            {
                                unitSummary.length === 0
                                ?
                                <p className="text-secondary pt-5">Currently unit types have been added. Create units with the <b>Add Unit</b> button above.</p>
                                :
                                <div className="row">
                                    {
                                        unitSummary.map((unit, index) => (
                                            <div className='my-2 col-12 col-lg-6 col-xl-4' key={index}>
                                                <div className="card flex-row align-items-center p-2 bg-light">
                                                    <b className='me-auto'>{unit.unitName}</b>
                                                    <button type='button' className="btn btn-link text-secondary" onClick={() => handleEditUnitSummary(index)}>
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </button>
                                                    <button type='button' className="btn btn-link text-danger" onClick={() => handleDeleteUnitSummary(index)}>
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                        <h5>Unit Availabilities</h5>
                        <p>Use this section for showing which units are currently available.</p>
                        <div className="d-flex flex-column my-4">
                            <small className='text-secondary'>Add an available unit with the <b>Add Availability</b> button. All available unit added will be displayed below.</small>
                            <div>
                                <button type='button' className="btn btn-outline-primary" onClick={toggleUnitAvailableModal}>Add Availability</button>
                            </div>

                        </div>
                    </form>
                </div>
            </TabView>
            <Modal isOpen={unitSummaryModal} toggle={toggleUnitSummaryModal} size='lg' centered>
                <ModalHeader>
                    {
                        isEditing_summary
                        ?
                        'Editing Unit Type'
                        :
                        'Create A Unit Type'
                    }
                </ModalHeader>
                <ModalBody>
                    <div className="row my-3">
                        <div className="col-12 col-lg-6">
                            <label className='form-label' htmlFor="unitName">Unit Name</label>
                            <input
                                id='unitName'
                                className='form-control'
                                type="text"
                                value={unitName_create}
                                onChange={e => setUnitName_create(e.target.value)}
                            />
                        </div>
                        <div className="col-12 col-lg-6">
                            <label htmlFor="monthlyRent" className="form-label">Monthly Rent</label>
                            <div className="input-group">
                                <span className='input-group-text'>$</span>
                                <input
                                    id='monthlyRent'
                                    className='form-control'
                                    type="Number"
                                    min={0}
                                    step='.01'
                                    value={monthlyRent_create}
                                    onChange={e => setMonthlyRent_create(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row my-3 align-items-end">
                        <div className="col-12 col-lg-6">
                            <label htmlFor="width" className="form-label">Unit Width</label>
                            <small className='text-secondary d-block'>Width in feet (a <b>ft</b> symbol will be added to the value entered)</small>
                            <input
                                id="width"
                                className="form-control"
                                type='Number'
                                min={0}
                                value={width_create}
                                onChange={e => setWidth_create(e.target.value)}
                            />
                        </div>
                        <div className="col-12 col-lg-6">
                            <label htmlFor="height" className="form-label">Unit Height</label>
                            <input
                                id="height"
                                className="form-control"
                                type='text'
                                value={height_create}
                                onChange={e => setHeight_create(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row my-3 align-items-end">
                        <div className="col-12 col-lg-6">
                            <label htmlFor="depth" className="form-label">Unit Depth</label>
                            <small className='text-secondary d-block'>Depth in feet (a <b>ft</b> symbol will be added to the value entered)</small>
                            <input
                                id='depth'
                                className="form-control"
                                type="Number"
                                min={0}
                                value={depth_create}
                                onChange={e => setDepth_create(e.target.value)}
                            />
                        </div>
                        <div className="col-12 col-lg-6">
                            <label htmlFor="sqft" className="form-label">Square Feet</label>
                            <small className='text-secondary d-block'>Square footage (a <b>sqft</b> symbol will be added to the value entered)</small>
                            <input
                                id='sqft'
                                className="form-control"
                                type="Number"
                                min={0}
                                value={sqft_create}
                                onChange={e => setSqft_create(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row my-3 align-items-end">
                        <div className="col-12 col-lg-6">
                            <label htmlFor="numberOfUnits" className="form-label">Number of Units</label>
                            <small className='text-secondary d-block'>The total number of these units that are at this location.</small>
                            <input
                                id='numberOfUnits'
                                className="form-control"
                                type="Number"
                                min={0}
                                value={numberOfUnits_create}
                                onChange={e => setNumberOfUnits_create(e.target.value)}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn" onClick={toggleUnitSummaryModal}>CANCEL</button>
                    {
                        isEditing_summary
                        ?
                        <button className="btn btn-primary" onClick={handleUpdateUnitSummary}>Update</button>
                        :
                        <button className="btn btn-primary" onClick={handleCreateUnitSummary}>Create</button>
                    }
                </ModalFooter>
            </Modal>
            <Modal isOpen={unitAvailableModal} toggle={toggleUnitAvailableModal} size='lg' centered>
                <ModalHeader>
                    {
                        isEditing_available
                        ?
                        'Editing Unit'
                        :
                        'Add A New Availability'
                    }
                </ModalHeader>
                <ModalBody>
                    {
                        availableModalPage === 1 &&
                        <div className="row">
                            <div className="col-12 col-lg-6 d-flex flex-column border-end border-dark">
                                <p>You can add available unit information based on a unit previously created by selecting the unit name in the dropdown below.</p>
                                <label htmlFor="existingUnit" className="form-label text-secondary">Existing Unit</label>
                                <div className="input-group">
                                    <select
                                        id="existingUnit"
                                        className="form-select"
                                        value={existingUnit}
                                        onChange={e => setExistingUnit(JSON.parse(e.target.value))}
                                    >
                                        <option value='' selected>Select Unit</option>
                                        {
                                            unitSummary.map((unit, index) => (
                                                <option key={index} value={JSON.stringify(unit)}>{unit.unitName}</option>
                                            ))
                                        }
                                    </select>
                                    <button
                                        className="btn btn-outline-primary"
                                        onClick={handleNextClickAvailableModal}
                                        disabled={existingUnit === ''}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                            <div className="d-lg-none text-center mt-5">or</div>
                            <div className="col-12 col-lg-6 d-flex flex-column text-center justify-content-center mt-5 mt-lg-0">
                                <p>Enter values for unit manually</p>
                                <div>
                                    <button className="btn btn-outline-secondary">Enter Manually</button>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        availableModalPage === 2 &&
                        <>
                            <div className="row my-3">
                                <div className="col-12 col-lg-6">
                                    <label className='form-label' htmlFor="unitName">Unit Name</label>
                                    <input
                                        id='unitName'
                                        className='form-control'
                                        type="text"
                                        value={unitName_available}
                                        onChange={e => setUnitName_available(e.target.value)}
                                    />
                                </div>
                                <div className="col-12 col-lg-6">
                                    <label htmlFor="monthlyRent" className="form-label">Monthly Rent</label>
                                    <div className="input-group">
                                        <span className='input-group-text'>$</span>
                                        <input
                                            id='monthlyRent'
                                            className='form-control'
                                            type="Number"
                                            min={0}
                                            step='.01'
                                            value={monthlyRent_available}
                                            onChange={e => setMonthlyRent_available(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row my-3 align-items-end">
                                <div className="col-12 col-lg-6">
                                    <label htmlFor="width" className="form-label">Unit Width</label>
                                    <small className='text-secondary d-block'>Width in feet (a <b>ft</b> symbol will be added to the value entered)</small>
                                    <input
                                        id="width"
                                        className="form-control"
                                        type='Number'
                                        min={0}
                                        value={width_available}
                                        onChange={e => setWidth_available(e.target.value)}
                                    />
                                </div>
                                <div className="col-12 col-lg-6">
                                    <label htmlFor="height" className="form-label">Unit Height</label>
                                    <input
                                        id="height"
                                        className="form-control"
                                        type='text'
                                        value={height_available}
                                        onChange={e => setHeight_available(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row my-3 align-items-end">
                                <div className="col-12 col-lg-6">
                                    <label htmlFor="depth" className="form-label">Unit Depth</label>
                                    <small className='text-secondary d-block'>Depth in feet (a <b>ft</b> symbol will be added to the value entered)</small>
                                    <input
                                        id='depth'
                                        className="form-control"
                                        type="Number"
                                        min={0}
                                        value={depth_available}
                                        onChange={e => setDepth_available(e.target.value)}
                                    />
                                </div>
                                <div className="col-12 col-lg-6">
                                    <label htmlFor="sqft" className="form-label">Square Feet</label>
                                    <small className='text-secondary d-block'>Square footage (a <b>sqft</b> symbol will be added to the value entered)</small>
                                    <input
                                        id='sqft'
                                        className="form-control"
                                        type="Number"
                                        min={0}
                                        value={sqft_available}
                                        onChange={e => setSqft_available(e.target.value)}
                                    />
                                </div>
                            </div>
                        </>
                    }
                </ModalBody>
                <ModalFooter>
                    <button className="btn" onClick={toggleUnitAvailableModal}>CANCEL</button>
                    {
                        availableModalPage === 2 &&
                        (isEditing_available
                        ?
                        <button className="btn btn-primary" onClick={handleUpdateUnitAvailable}>Update</button>
                        :
                        <button className="btn btn-primary" onClick={handleAddUnitAvailable}>Add</button>)
                    }
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default UnitTabView;