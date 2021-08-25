import React, { useEffect, useState } from 'react';
import { TAB_THUMBNAIL } from '../../shared/Constants';
import TabView from '../tabView/TabView';

const GeneralTabView = ({location}) => {
    const [name, setName] = useState('');
    const [addressFirstLine, setAddressFirstLine] = useState('');
    const [addressSecondLine, setAddressSecondLine] = useState('');
    const [slug, setSlug] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactEmail, setContactEmail] = useState('');

    useEffect(() => {
        setName(location.name ? location.name : '');
        setAddressFirstLine(location.addressFirstLine ? location.addressFirstLine : '');
        setAddressSecondLine(location.addressSecondLine ? location.addressSecondLine : '');
        setSlug(location.slug ? location.slug : '');
        setContactName(location.contactName ? location.contactName : '');
        setContactPhone(location.contactPhone ? location.contactPhone : '');
        setContactEmail(location.contactEmail ? location.contactEmail : '');
    }, [location]);

    const handleFormSubmit = e => {
        e.preventDefault();
    }

    const handleHideLocation = () => {

    }

    const handleDeleteLocation = () => {

    }

    return (
        <div className='GeneralTabView'>
            <TabView
                header={`General ${location.name ? '- ' + location.name : ''}`}
                description='This section is for editing the general details about the location including the name, description, address, contact and coordinates.'
                nextView={TAB_THUMBNAIL}
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
                    <form onSubmit={handleFormSubmit}>
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
                            />
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
                                onChange={e => setSlug(e.target.value)}
                            />
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
                            Coordinates
                        </div>
                        <div className="d-flex flex-column my-4">
                            Short Description
                        </div>
                        <div className="d-flex flex-column my-4">
                            Long Description
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
                                placeholder='Enter Contact Phone XXX-XXX-XXXX Format'
                                value={contactPhone}
                                onChange={e => setContactPhone(e.target.value)}
                            />
                        </div>
                        <div className="d-flex flex-column my-4">
                            <label className='form-label' htmlFor="contactEmail">Contact Email</label>
                            <small className='text-secondary'>The email address of the contact for this location.</small>
                            <input
                                id='contactEmail'
                                className='form-control'
                                type="text"
                                placeholder='Enter Contact Email'
                                value={contactEmail}
                                onChange={e => setContactEmail(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
            </TabView>
        </div>
    );
};

export default GeneralTabView;