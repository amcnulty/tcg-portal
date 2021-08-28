import React, { useContext, useEffect, useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { UPDATE_PREVIEW } from '../../context/ActionTypes';
import { AppContext } from '../../context/Store';
import { TAB_THUMBNAIL } from '../../shared/Constants';
import { API } from '../../util/API';
import CoordinatePicker from '../coordinatePicker/CoordinatePicker';
import TabView from '../tabView/TabView';

const GeneralTabView = ({location}) => {
    const [state, dispatch] = useContext(AppContext);

    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [addressFirstLine, setAddressFirstLine] = useState('');
    const [addressSecondLine, setAddressSecondLine] = useState('');
    const [coordinatesFromMap, setCoordinatesFromMap] = useState();
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [currentFeature, setCurrentFeature] = useState('');
    const [features, setFeatures] = useState([]);
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactEmail, setContactEmail] = useState('');

    const [wasValidated, setWasValidated] = useState(false);
    const [slugErrorMessage, setSlugErrorMessage] = useState('');

    /**
     * Every time a field changes update the preview so when this tab is exited the preview retains its data.
     */
    useEffect(() => {
        return () => {
            updatePreview();
        }
    }, [name, slug, addressFirstLine, addressSecondLine, coordinatesFromMap, lat, long, shortDescription, longDescription, currentFeature, features, contactName, contactPhone, contactEmail]);

    useEffect(() => {
        setName(location.name ? location.name : '');
        setSlug(location.slug ? location.slug : '');
        setAddressFirstLine(location.addressFirstLine ? location.addressFirstLine : '');
        setAddressSecondLine(location.addressSecondLine ? location.addressSecondLine : '');
        setLat(location.coordinates && location.coordinates.length > 1 ? location.coordinates[0] : 40.68924454236941);
        setLong(location.coordinates && location.coordinates.length > 1 ? location.coordinates[1] : -74.04454171657564);
        setShortDescription(location.shortDescription ? location.shortDescription : '');
        setLongDescription(location.longDescription ? location.longDescription : '');
        setFeatures(location.features ? location.features : []);
        setContactName(location.contactName ? location.contactName : '');
        setContactPhone(location.contactPhone ? location.contactPhone : '');
        setContactEmail(location.contactEmail ? location.contactEmail : '');
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
                _id: location._id,
                ...(name && {name}),
                ...(slug && {slug}),
                ...(addressFirstLine && {addressFirstLine}),
                ...(addressSecondLine && {addressSecondLine}),
                ...((lat && long) && {coordinates: [lat, long]}),
                ...(shortDescription && {shortDescription}),
                ...(longDescription && {longDescription}),
                ...(features && {features}),
                ...(contactName && {contactName}),
                ...(contactPhone && {contactPhone}),
                ...(contactEmail && {contactEmail})
            };
            API.updateLocation(requestObject, (res, err) => {
                if (res && res.status === 200) {
                    console.log('success!');
                }
                else if (err) {
                    console.log(err);
                }
            });
            // e.target.elements.namedItem('slug').setCustomValidity('Current value already in use, url slug must be unique. Choose another value.');
            // setSlugErrorMessage('Current value already in use, url slug must be unique. Choose another value.')
        }
        setWasValidated(true);
    }

    const handleHideLocation = () => {

    }

    const handleDeleteLocation = () => {

    }

    const handleSlugChange = e => {
        if (/[^a-z0-9-_]/g.test(e.target.value)) {
            e.target.setCustomValidity('Field is required and must not contain spaces, uppercase letters or special characters (other than - and _).');
            setSlugErrorMessage('Field is required and must not contain spaces, uppercase letters or special characters (other than - and _).');
        }
        else {
            e.target.setCustomValidity('');
        }
        setSlug(e.target.value);
    }
    /**
     * Updates the preview in context so when it is time to show the preview data from this tab will be included.
     */
    const updatePreview = () => {
        const previewLocation = {
            ...(name && {name}),
            ...(slug && {slug}),
            ...(addressFirstLine && {addressFirstLine}),
            ...(addressSecondLine && {addressSecondLine}),
            ...((lat && long) && {coordinates: [lat, long]}),
            ...(shortDescription && {shortDescription}),
            ...(longDescription && {longDescription}),
            ...(features && {features}),
            ...(contactName && {contactName}),
            ...(contactPhone && {contactPhone}),
            ...(contactEmail && {contactEmail})
        };
        const payload = {
            ...state.previewLocation,
            ...previewLocation
        };
        dispatch({type: UPDATE_PREVIEW, payload: payload});
    }
    
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div className='GeneralTabView'>
            <TabView
                header={`General ${location.name ? '- ' + location.name : ''}`}
                description='This section is for editing the general details about the location including the name, description, address, contact and coordinates.'
                nextView={TAB_THUMBNAIL}
                formId='generalForm'
                showSaveButton={location.isPublished}
                updatePreview={updatePreview}
            >
                <div className="card actionsSection p-4 my-4">
                    <h5>Quick Actions</h5>
                    <p>Below is a list of actions you can perform on this location record.</p>
                    {
                        location.isPublished &&
                        <div className="d-flex flex-column my-4">
                            <p>View this location on the live site.</p>
                            <span>
                                <a className='btn btn-outline-primary' href={`https://contractorsgarage.com/location/${location.slug}`} target='_blank'>View Location &nbsp; <i className="fas fa-external-link-alt"></i></a>
                            </span>
                        </div>
                    }
                    <div className="d-flex flex-column my-4">
                        <p>Hide this location from view on the live site. This will only temporarily disable the location and will not delete it. You can reverse this action at any time.</p>
                        <span>
                            <button className="btn btn-outline-secondary" onClick={handleHideLocation}>Hide Location</button>
                        </span>
                    </div>
                    <div className="d-flex flex-column my-4">
                        <p>Delete this location from the database. Warning this action cannot be reversed!</p>
                        <span>
                            <button className="btn btn-outline-danger" onClick={handleDeleteLocation}>Delete</button>
                        </span>
                    </div>
                </div>
                <div className='card editDetailCard p-4'>
                    <form id='generalForm' className={`needs-validation ${wasValidated ? 'was-validated' : ''}`} onSubmit={handleFormSubmit} noValidate>
                        <h5>Details</h5>
                        <p>Use this section for filling out the basic details for this location.</p>
                        <div className="d-flex flex-column my-4">
                            <label className='form-label requiredField' htmlFor="name">Display Name</label>
                            <small className='text-secondary'>This is the title of the location and will be displayed on the location directory and the top of this location page.</small>
                            <input
                                id='name'
                                className='form-control'
                                type="text"
                                placeholder='Enter Display Name'
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                            <div className="invalid-feedback fw-bold">
                                Display name is a required field please enter a display name above.
                            </div>
                        </div>
                        <div className="d-flex flex-column my-4">
                            <label className='form-label requiredField' htmlFor="slug">URL Slug</label>
                            <small className='text-secondary'>This is the unique ending of the URL that will link to your location page. It is a good idea to use something easy to type and human readable. Spaces are not allowed use the - or _ symbol as a separator. Only lowercase letters and numbers are allowed no special characters.</small>
                            <small className='text-secondary'>Example: 'florida-garage' would appear like this in the URL. https://contractorsgarage.com/location/<span className='fw-bold'>florida-garage</span></small>
                            <input
                                id='slug'
                                className='form-control'
                                type="text"
                                placeholder='florida-garage'
                                value={slug}
                                onChange={handleSlugChange}
                                required
                            />
                            <div className="invalid-feedback fw-bold">
                                {slugErrorMessage}
                            </div>
                        </div>
                        <div className="d-flex flex-column my-4">
                            <label className='form-label' htmlFor="addressFirstLine">Address (First Line)</label>
                            <small className='text-secondary'>The street address for this location.</small>
                            <small className='text-secondary'>Example: 123 Main Street</small>
                            <input
                                id='addressFirstLine'
                                className='form-control'
                                type="text"
                                placeholder='Enter Address'
                                value={addressFirstLine}
                                onChange={e => setAddressFirstLine(e.target.value)}
                            />
                        </div>
                        <div className="d-flex flex-column my-4">
                            <label className='form-label' htmlFor="addressSecondLine">Address (Second Line)</label>
                            <small className='text-secondary'>The city state and zip code for this location.</small>
                            <small className='text-secondary'>Example: San Francisco, California 94105</small>
                            <input
                                id='addressSecondLine'
                                className='form-control'
                                type="text"
                                placeholder='Enter City, State Zip'
                                value={addressSecondLine}
                                onChange={e => setAddressSecondLine(e.target.value)}
                            />
                        </div>
                        <div className="d-flex flex-column my-4">
                            <h6>Coordinates</h6>
                            <p>The exact coordinates to display the marker on the map for this location. You can manually enter the <i>latitude</i> and <i>longitude</i> or you can choose the point from the map by selecting <b>Choose From Map</b>.</p>
                            <div className='row align-items-end'>
                                <div className='d-flex flex-column col-12 col-md-3'>
                                    <label className='requiredField' htmlFor="lat">Latitude</label>
                                    <input
                                        id='lat'
                                        className='form-control'
                                        type="number"
                                        max='90'
                                        min='-90'
                                        step='any'
                                        value={lat}
                                        onChange={e => setLat(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='d-flex flex-column col-12 col-md-3 mt-4'>
                                    <label className='requiredField' htmlFor="log">Longitude</label>
                                    <input
                                        id='log'
                                        className='form-control'
                                        type="number"
                                        max='180'
                                        min='-180'
                                        step='any'
                                        value={long}
                                        onChange={e => setLong(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='col-12 col-md-6'>
                                    <button className="btn btn-outline-primary mt-4" type='button' onClick={toggle}>Choose From Map</button>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-column my-4">
                            <label className='form-label' htmlFor="shortDescription">Short Description</label>
                            <small className='text-secondary'>Description of this location to be shown on the map marker popup. Limit 140 characters.</small>
                            <textarea
                                id='shortDescription'
                                className='form-control'
                                maxLength={140}
                                value={shortDescription}
                                onChange={e => setShortDescription(e.target.value)}
                            />
                        </div>
                        <div className="d-flex flex-column my-4">
                            <label className='form-label' htmlFor="longDescription">Long Description</label>
                            <small className='text-secondary'>Description of this location to be shown on the location detail page. This will be shown at the top of the page and should include a description of the features and services.</small>
                            <textarea
                                id='longDescription'
                                className='form-control'
                                rows={6}
                                value={longDescription}
                                onChange={e => setLongDescription(e.target.value)}
                            />
                        </div>
                        <div className="d-flex flex-column my-4">
                            <label className='form-label' htmlFor="features">Features</label>
                            <small className='text-secondary'>A list of features and services provided at this location. Each item will appear as an item in a bulleted list. Enter each item in the input below and press <b>Add Feature</b> to add it to the list. To remove an item from the list press the <b>&times;</b> next to the item.</small>
                            <form onSubmit={e => e.preventDefault()}>
                                <div className="input-group">
                                    <input
                                        id='features'
                                        type="text"
                                        className='form-control'
                                        placeholder='Enter Feature'
                                        value={currentFeature}
                                        onChange={e => setCurrentFeature(e.target.value)}
                                    />
                                    <button
                                        className="btn btn-outline-primary"
                                        onClick={() => setFeatures([...features, currentFeature])}
                                    >
                                        Add Feature
                                    </button>
                                </div>
                            </form>
                            {
                                features.length === 0 &&
                                <p className="text-secondary pt-5">Currently no features. Add features above and view them here...</p>
                            }
                            <ul className='list-unstyled mt-3'>
                                {
                                    features.map((feature, index) => (
                                        <li className='my-2' key={index}>
                                            <div className="badge bg-secondary">
                                                <span>{feature}</span>
                                                <button
                                                    className="btn btn-close btn-close-white"
                                                    type='button'
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to delete this feature?')) {
                                                            const newFeatures = [...features];
                                                            newFeatures.splice(index, 1);
                                                            setFeatures(newFeatures);
                                                        }
                                                    }}
                                                >
                                                </button>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <h5>Contact Info</h5>
                        <div className="d-flex flex-column my-4">
                            <label className='form-label' htmlFor="contactName">Contact Name</label>
                            <small className='text-secondary'>The name of the contact for this location.</small>
                            <input
                                id='contactName'
                                className='form-control'
                                type="text"
                                placeholder='Enter Contact Name'
                                value={contactName}
                                onChange={e => setContactName(e.target.value)}
                            />
                        </div>
                        <div className="d-flex flex-column my-4">
                            <label className='form-label' htmlFor="contactPhone">Contact Phone</label>
                            <small className='text-secondary'>The phone number of the contact for this location.</small>
                            <input
                                id='contactPhone'
                                className='form-control'
                                type="text"
                                pattern='[\d]{3}-[\d]{3}-[\d]{4}|[\d]{10}'
                                placeholder='Enter Contact Phone XXX-XXX-XXXX Format'
                                value={contactPhone}
                                onChange={e => setContactPhone(e.target.value)}
                            />
                            <div className="invalid-feedback fw-bold">
                                Phone number must contain only numbers or numbers separated with dashes, no spaces, letters or special characters allowed (other than -).
                            </div>
                        </div>
                        <div className="d-flex flex-column my-4">
                            <label className='form-label' htmlFor="contactEmail">Contact Email</label>
                            <small className='text-secondary'>The email address of the contact for this location.</small>
                            <input
                                id='contactEmail'
                                className='form-control'
                                type="email"
                                placeholder='Enter Contact Email'
                                value={contactEmail}
                                onChange={e => setContactEmail(e.target.value)}
                            />
                            <div className="invalid-feedback fw-bold">
                                Email address entered is not valid!
                            </div>
                        </div>
                    </form>
                </div>
            </TabView>
            <Modal isOpen={modal} toggle={toggle} size='lg'>
                <ModalHeader>Choose Location On Map</ModalHeader>
                <ModalBody>
                    <p>Click on map to set marker location when finished click continue.</p>
                    <CoordinatePicker
                        center={(lat !== '' && long !== '') ? [lat, long] : location.coordinates ? location.coordinates : [lat, long]}
                        onCoordinateSelect={setCoordinatesFromMap}
                    />
                </ModalBody>
                <ModalFooter>
                    <button className="btn" onClick={toggle}>CANCEL</button>
                    <button
                        className="btn btn-primary"
                        disabled={!coordinatesFromMap}
                        onClick={() => {setLat(coordinatesFromMap[0]); setLong(coordinatesFromMap[1]); toggle();}}
                    >
                        Continue
                    </button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default GeneralTabView;