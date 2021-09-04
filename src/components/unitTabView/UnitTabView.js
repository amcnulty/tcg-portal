import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { UPDATE_PREVIEW } from '../../context/ActionTypes';
import { AppContext } from '../../context/Store';
import { TAB_MEDIA, TAB_THUMBNAIL } from '../../shared/Constants';
import { API } from '../../util/API';
import { HELPERS, TOAST_TYPES } from '../../util/helpers';
import TabView from '../tabView/TabView';
import UnitCard from '../unitCard/UnitCard';

const UnitTabView = ({location}) => {
    const [state, dispatch] = useContext(AppContext);
    const history = useHistory();

    // location fields
    const [unitSummary, setUnitSummary] = useState();
    const [units, setUnits] = useState();
    const [extras, setExtras] = useState();
    const [isPublished, setIsPublished] = useState();

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
    const [isAvailable_available, setIsAvailable_available] = useState(true);

    // Fields for extras modal
    const [price_extra, setPrice_extra] = useState();
    const [frequency_extra, setFrequency_extra] = useState();
    const [details_extra, setDetails_extra] = useState();

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

    // extras state
    const [extrasModal, setExtrasModal] = useState(false);
    const [isEditing_extra, setIsEditing_extra] = useState(false);
    const [editingIndex_extra, setEditingIndex_extra] = useState(-1);
    

    /**
     * Every time a field changes update the preview so when this tab is exited the preview retains its data.
     */
    useEffect(() => {
        updatePreview();
    }, [unitSummary, units, extras, isPublished]);

    useEffect(() => {
        const locationWithChanges = {
            ...location,
            ...state.previewLocation
        };
        setUnitSummary(locationWithChanges.unitSummary ? locationWithChanges.unitSummary : '');
        setUnits(locationWithChanges.units ? locationWithChanges.units : '');
        setExtras(locationWithChanges.extras ? locationWithChanges.extras : '');
        setIsPublished(locationWithChanges.isPublished ? locationWithChanges.isPublished: null);
    }, [location]);

    const handleFormSubmit = (e, publish) => {
        if (!e.target.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            e.preventDefault();
            if (state.previewLocation._id) {
                const updateRequest = publish ? { ...state.previewLocation, isPublished: true, isDraft: false } : state.previewLocation;
                API.updateLocation_hideToast(updateRequest, (res, err) => {
                    if (res && res.status === 200) {
                        console.log('success!');
                        if (publish) {
                            setIsPublished(true);
                            HELPERS.showToast(TOAST_TYPES.SUCCESS, 'Location Published!');
                        }
                        else {
                            HELPERS.showToast(TOAST_TYPES.SUCCESS, 'Update Successful!');
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
                        console.log('success!');
                        dispatch({type: UPDATE_PREVIEW, payload: res.data});
                        history.push(`/location/${res.data._id}`);
                    }
                    else if (err) {
                        console.log(err);
                    }
                });
            }
        }
        setWasValidated(true);
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
            ...(unitSummary && {unitSummary}),
            ...(units && {units}),
            ...(extras && {extras}),
            ...((isPublished != null) && {isPublished})
        };
        const payload = {
            ...location,
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
        setUnitSummary([...unitSummary, newUnit]);
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
        setExistingUnit('');
        setTimeout(() => {
            setAvailableModalPage(1);
        }, 500);
    }

    const handleNextClickAvailableModal = () => {
        const unit = JSON.parse(existingUnit);
        setAvailableModalPage(2);
        setUnitName_available(unit.unitName ? unit.unitName : '');
        setMonthlyRent_available(unit.monthlyRent ? unit.monthlyRent : '');
        setWidth_available(unit.width ? unit.width : '');
        setHeight_available(unit.height ? unit.height : '');
        setDepth_available(unit.depth ? unit.depth : '');
        setSqft_available(unit.squareFeet ? unit.squareFeet : '');
    }
    
    const handleAddUnitAvailable = () => {
        const newUnit = {
            ...(unitName_available && {unitName: unitName_available}),
            ...(monthlyRent_available && {monthlyRent: monthlyRent_available}),
            ...(width_available && {width: width_available}),
            ...(height_available && {height: height_available}),
            ...(depth_available && {depth: depth_available}),
            ...(sqft_available && {squareFeet: sqft_available}),
            available: true
        };
        setUnits([...units, newUnit]);
        toggleUnitAvailableModal();
    }
    
    const handleUpdateUnitAvailable = () => {
        const newUnit = {
        ...(unitName_available && {unitName: unitName_available}),
        ...(monthlyRent_available && {monthlyRent: monthlyRent_available}),
        ...(width_available && {width: width_available}),
        ...(height_available && {height: height_available}),
        ...(depth_available && {depth: depth_available}),
        ...(sqft_available && {squareFeet: sqft_available}),
        ...(isAvailable_available && {available: isAvailable_available})
        };
        const newUnits = [...units];
        newUnits.splice(editingIndex_available, 1, newUnit);
        setUnits(newUnits);
        toggleUnitAvailableModal();
    }

    const handleAvailableClick = index => {
        if (units[index]) {
            const newUnits = [...units];
            newUnits[index].available = !newUnits[index].available;
            setUnits(newUnits);
        }
    }

    const handleEditUnitAvailable = (index) => {
        if (units[index]) {
            setUnitName_available(units[index].unitName);
            setMonthlyRent_available(units[index].monthlyRent);
            setWidth_available(units[index].width);
            setHeight_available(units[index].height);
            setDepth_available(units[index].depth);
            setSqft_available(units[index].squareFeet);
            setIsAvailable_available(units[index].available);
            setIsEditing_available(true);
            setEditingIndex_available(index);
            setAvailableModalPage(2);
            toggleUnitAvailableModal();
        }
    }

    const handleDeleteUnitAvailable = (index) => {
        if (window.confirm('Are you sure you want to delete this unit availability?')) {
            const newUnits = [...units];
            newUnits.splice(index, 1);
            setUnits(newUnits);
        }
    }
  
    /*
    *          !!##########################!!
    *          !!                          !!
    *          !!          Extras          !!
    *          !!                          !!
    *          !!##########################!!
    */

    const toggleExtrasModal = () => {
        if (extrasModal) {
            resetExtrasModal();
        }
        setExtrasModal(!extrasModal);
    }

    const resetExtrasModal = () => {
        setPrice_extra('');
        setFrequency_extra('');
        setDetails_extra('');
        setIsEditing_extra(false);
        setEditingIndex_extra(-1);
    }

    const handleCreateExtra = () => {
        const newExtra = {
            ...(price_extra && {price: price_extra}),
            ...(frequency_extra && {frequency: frequency_extra}),
            ...(details_extra && {details: details_extra})
        };
        setExtras([...extras, newExtra]);
        toggleExtrasModal();
    }

    const handleUpdateExtra = () => {
        const newExtra = {
            ...(price_extra && {price: price_extra}),
            ...(frequency_extra && {frequency: frequency_extra}),
            ...(details_extra && {details: details_extra})
        };
        const newExtras = [...extras];
        newExtras.splice(editingIndex_extra, 1, newExtra);
        setExtras(newExtras);
        toggleExtrasModal();
    }

    const handleEditExtra = index => {
        if (extras[index]) {
            setPrice_extra(extras[index].price);
            setFrequency_extra(extras[index].frequency);
            setDetails_extra(extras[index].details);
            setIsEditing_extra(true);
            setEditingIndex_extra(index);
            toggleExtrasModal();
        }
    }

    const handleDeleteExtra = index => {
        if (window.confirm('Are you sure you want to delete this pricing extra?')) {
            const newExtras = [...extras];
            newExtras.splice(index, 1);
            setExtras(newExtras);
        }
    }

    return (
        <div className='UnitTabView'>
            <TabView
                header={`Unit and Pricing Information ${state.previewLocation.name ? '- ' + state.previewLocation.name : ''}`}
                description='This section is for editing unit information including a summary of the units at this location and a list of what units are currently available.'
                previousView={TAB_THUMBNAIL}
                nextView={TAB_MEDIA}
                formId='unitForm'
                isPublished={isPublished}
                updatePreview={updatePreview}
                onPublish={handlePublish}
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
                                !unitSummary || (unitSummary && unitSummary.length === 0)
                                ?
                                <p className="text-secondary pt-5">Currently no unit types have been added. Create units with the <b>Add Unit</b> button above.</p>
                                :
                                <div className="row">
                                    {
                                        unitSummary.map((unit, index) => (
                                            <div className='my-2 col-12 col-lg-6 col-xl-4' key={index}>
                                                <UnitCard
                                                    unit={unit}
                                                    onEditClick={() => handleEditUnitSummary(index)}
                                                    onDeleteClick={() => handleDeleteUnitSummary(index)}
                                                />
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
                            {
                                !units || (units && units.length === 0)
                                ?
                                <p className="text-secondary pt-5">Currently no available units have been added. Create availabilities with the <b>Add Availability</b> button above.</p>
                                :
                                <div className="row">
                                    <p className='p-4 mt-3 bg-warning rounded-3'><b className='fst-italic'>Note:</b> You can quick change the availability of a unit by clicking the <b className='text-danger'>red</b> or <b className='text-success'>green</b> circular indicators. Setting a unit as <i>Unavailable</i> will remove it from the list of availabilities without deleting the record.</p>
                                    {
                                        units.map((unit, index) => (
                                            <div className='my-2 col-12 col-lg-6 col-xl-4' key={index}>
                                                <UnitCard
                                                    unit={unit}
                                                    hideTotal
                                                    showAvailable
                                                    onEditClick={() => handleEditUnitAvailable(index)}
                                                    onDeleteClick={() => handleDeleteUnitAvailable(index)}
                                                    onAvailableClick={() => handleAvailableClick(index)}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                        <h5>Pricing Extras</h5>
                        <p>Use this section to list extra charges, services, features that are available at this location such as additional storage, key replacements, parking etc.</p>
                        <div className="d-flex flex-column my-4">
                            <small className='text-secondary'>Add a pricing extra with the <b>Add Extra</b> button. All pricing extras will be displayed below.</small>
                            <div>
                                <button type='button' className="btn btn-outline-primary" onClick={toggleExtrasModal}>Add Extra</button>
                            </div>
                            {
                                !extras || (extras && extras.length === 0)
                                ?
                                <p className="text-secondary pt-5">Currently no pricing extras have been added. Create pricing extras with the <b>Add Extra</b> button above.</p>
                                :
                                <div className="row">
                                    {
                                        extras.map((extra, index) => (
                                            <div className='my-2 col-12 col-xl-6' key={index}>
                                                <div className="card">
                                                    <div className="card-header d-flex flex-row align-items-center p-2 bg-light">
                                                        <b className='me-auto'>Pricing Extra</b>
                                                        <button type='button' className="btn btn-link text-secondary" onClick={() => handleEditExtra(index)}>
                                                            <i className="fas fa-pencil-alt"></i>
                                                        </button>
                                                        <button type='button' className="btn btn-link text-danger" onClick={() => handleDeleteExtra(index)}>
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button>
                                                    </div>
                                                    <div className="card-body row">
                                                        <div className="col-12 col-sm-6">
                                                            <label className='fw-bold text-secondary'>Price:</label>
                                                            <span className="ms-3">{extra.price ? `$${extra.price}` : '-'}</span>
                                                        </div>
                                                        <div className="col-12 col-sm-6">
                                                            <label className='fw-bold text-secondary'>Frequency:</label>
                                                            <span className="ms-3">{extra.frequency ? `${extra.frequency}` : '-'}</span>
                                                        </div>
                                                        <div className="col-12">
                                                            <label className='fw-bold text-secondary'>Details:</label>
                                                            <span className="ms-3">{extra.details ? extra.details : '-'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
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
                    <div className="row my-3 align-items-end">
                        <div className="col-12 col-lg-6">
                            <label className='form-label' htmlFor="unitName">Unit Name</label>
                            <small className='text-secondary d-block'>Name that describes this unit like 'Small Unit' or 'Large Unit'.</small>
                            <input
                                id='unitName'
                                className='form-control'
                                type="text"
                                placeholder='Enter Unit Name'
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
                                    placeholder='Enter Monthly Rent'
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
                                placeholder='Enter Width'
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
                                placeholder='Enter Height'
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
                                placeholder='Enter Depth'
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
                                placeholder='Enter Square Feet'
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
                                placeholder='Enter # Of Units'
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
                                        onChange={e => setExistingUnit(e.target.value)}
                                    >
                                        <option value='' selected>Select Unit</option>
                                        {
                                            unitSummary &&
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
                                    <button className="btn btn-outline-secondary" onClick={() => setAvailableModalPage(2)}>Enter Manually</button>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        availableModalPage === 2 &&
                        <>
                            <div className="row my-3 align-items-end">
                                <div className="col-12 col-lg-6">
                                    <label className='form-label' htmlFor="unitName">Unit Name</label>
                                    <small className='text-secondary d-block'>Can be the same as the unit summary name or the specific name/number of this unit like 'Unit 101'.</small>
                                    <input
                                        id='unitName'
                                        className='form-control'
                                        type="text"
                                        placeholder='Enter Unit Name'
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
                                            placeholder='Enter Monthly Rent'
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
                                        placeholder="Enter Width"
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
                                        placeholder='Enter Height'
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
                                        placeholder='Enter Depth'
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
                                        placeholder='Enter Square Feet'
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
            <Modal isOpen={extrasModal} toggle={toggleExtrasModal} size='lg' centered>
                <ModalHeader>
                    {
                        isEditing_extra
                        ?
                        'Editing Extra'
                        :
                        'Create A New Pricing Extra'
                    }
                </ModalHeader>
                <ModalBody>
                    <>
                        <div className="row my-3 align-items-end">
                            <div className="col-12 col-lg-6">
                                <label className='form-label' htmlFor="price">Price</label>
                                <small className='text-secondary d-block'>The price / cost of this extra.</small>
                                <div className="input-group">
                                    <span className='input-group-text'>$</span>
                                    <input
                                        id='price'
                                        className='form-control'
                                        type="Number"
                                        placeholder='Enter Price'
                                        min={0}
                                        step='.01'
                                        value={price_extra}
                                        onChange={e => setPrice_extra(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <label htmlFor="frequency" className="form-label">Pricing Frequency</label>
                                <small className='text-secondary d-block'>How often the charge is due.</small>
                                <small className='text-secondary'>Example: monthly, yearly, one time etc.</small>
                                <input
                                    id='frequency'
                                    className='form-control'
                                    type="text"
                                    placeholder='Enter Pricing Frequency'
                                    value={frequency_extra}
                                    onChange={e => setFrequency_extra(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row my-3 align-items-end">
                            <div className="col-12">
                                <label htmlFor="details" className="form-label">Details</label>
                                <small className='text-secondary d-block'>Explain what this charge is and the details associated with it.</small>
                                <textarea
                                    id="details"
                                    className='form-control'
                                    rows="4"
                                    placeholder='Enter Details'
                                    value={details_extra}
                                    onChange={e => setDetails_extra(e.target.value)}
                                />
                            </div>
                        </div>
                    </>
                </ModalBody>
                <ModalFooter>
                    <button className="btn" onClick={toggleExtrasModal}>CANCEL</button>
                    {
                        isEditing_extra
                        ?
                        <button className="btn btn-primary" onClick={handleUpdateExtra}>Update</button>
                        :
                        <button className="btn btn-primary" onClick={handleCreateExtra}>Create</button>
                    }
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default UnitTabView;