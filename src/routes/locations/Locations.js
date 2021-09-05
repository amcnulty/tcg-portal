import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LocationCard from '../../components/locationCard/LocationCard';
import { AppContext } from '../../context/Store';
import { API } from '../../util/API';
import './Locations.sass';

const Locations = () => {
    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useContext(AppContext);
    const history = useHistory();
    const [locations, setLocations] = useState([]);
    const [sortedLocations, setSortedLocations] = useState([]);

    useEffect(() => {
        loadLocations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.currentUser]);
    
    const loadLocations = () => {
        if (state.currentUser) {
            API.getLocations((res, err) => {
                if (res && res.status === 200) {
                    if (state.currentUser && state.currentUser.isAdmin) {
                        const locationData = res.data;
                        locationData.sort((a, b) => {
                            if (a.createdBy && b.createdBy) {
                                if (a.createdBy.username === state.currentUser.username) return -1;
                                else {
                                    return a.createdBy.username[0] < b.createdBy.username[0] ? -1 : 1;
                                }
                            }
                            else {
                                return -1;
                            }
                        });
                        setLocations(locationData);
                        const filteredLocationData = locationData.filter(location => !!location.createdBy);
                        const deletedUsersLocations = locationData.filter(location => !location.createdBy);
                        const sortedLocations = [];
                        const usernameIndexMap = {};
                        for (let i = 0; i < filteredLocationData.length; i++) {
                            if (usernameIndexMap[filteredLocationData[i].createdBy.username] !== undefined) {
                                sortedLocations[usernameIndexMap[filteredLocationData[i].createdBy.username]].push(filteredLocationData[i]);
                            }
                            else {
                                usernameIndexMap[filteredLocationData[i].createdBy.username] = sortedLocations.length;
                                sortedLocations[sortedLocations.length] = [];
                                sortedLocations[usernameIndexMap[filteredLocationData[i].createdBy.username]].push(filteredLocationData[i]);
                            }
                        }
                        sortedLocations.push(deletedUsersLocations);
                        setSortedLocations(sortedLocations);
                    }
                    else {
                        setLocations(res.data);
                    }
                }
            });
        }
    }

    const handleNewLocation = () => {
        history.push('/location/new');
    }

    const handleHide = id => {
        API.hideLocation(id, (res, err) => {
            if (res && res.status === 200) {
                console.log('success');
                loadLocations();
            }
            else if (err) {
                console.log(err);
            }
        });
    }

    const handleDelete = id => {
        if (window.confirm('Are you sure you want to delete this location? This action cannot be reversed.')) {
            API.deleteLocation(id, (res, err) => {
                if (res && res.status === 200) {
                    console.log('success');
                    loadLocations();
                }
                else if (err) {
                    console.log(err);
                }
            });
        }
    }

    return (
        <div className='Locations'>
            <div className="container mb-5 pb-5">
                <h2 className='my-4'>Location Management</h2>
                <p>Below is a list of the locations you have access to. From here you can select a location to make updates. To create a new location select the 'New Location' button and you will be taken to a creation screen where you can create and upload content.</p>
                <div className="row my-5">
                    <div className="card p-4">
                        <h4>Create New Location</h4>
                        {
                            (state.currentUser && state.currentUser.isAdmin) || (state.currentUser && state.currentUser.maxLocationAllowance > locations.filter(location => location.isPublished).length)
                            ?
                            <>
                                <p>Create a new location. You will be able to first create a draft and preview what it will look like before publishing.</p>
                                <button
                                    className="btn btn-primary col-xl-2 col-lg-3 col-sm-4"
                                    type='button'
                                    onClick={handleNewLocation}
                                >
                                    New Location
                                </button>
                            </>
                            :
                            <>
                                <p>
                                    You have reached your maximum location allowance of <b>{state.currentUser && state.currentUser.maxLocationAllowance}</b>!
                                </p>
                                <p>
                                    Please contact your administrator to request an increase in your max location allowance. For more information about listing with Contractors Garage visit the <a href='https://www.contractorsgarage.com/development-services' target='_blank' rel="noopener noreferrer">List With Us</a> page.
                                </p>
                            </>
                        }
                    </div>
                </div>
                <div className="row mb-5 pb-5">
                    {
                        locations && locations.length > 0
                        ?
                        state.currentUser && state.currentUser.isAdmin
                        ?
                            sortedLocations.map((locationsByUser, index) => (
                                <div className='row mb-5 pb-5' key={index}>
                                    <h4>
                                        {
                                            locationsByUser[0].createdBy
                                            ?
                                            locationsByUser[0].createdBy.username === state.currentUser.username ? 'Your Locations' : `${locationsByUser[0].createdBy.username} Locations (${locationsByUser[0].createdBy.firstName} ${locationsByUser[0].createdBy.lastName})`
                                            :
                                            '[deleted user]'
                                        }
                                    </h4>
                                    {
                                        locationsByUser.map(location => (
                                            <div className="col-12 col-md-6 col-xxl-4 my-2" key={location._id}>
                                                <LocationCard
                                                    location={location}
                                                    onEdit={() => history.push(`/location/${location._id}`)}
                                                    onHide={() => handleHide(location._id)}
                                                    onDelete={() => handleDelete(location._id)}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        :
                        <>
                            <h4>Your Locations</h4>
                            {
                                locations.map(location => (
                                    <div className="col-12 col-md-6 col-xxl-4 my-2" key={location._id}>
                                        <LocationCard
                                            location={location}
                                            onEdit={() => history.push(`/location/${location._id}`)}
                                            onHide={() => handleHide(location._id)}
                                            onDelete={() => handleDelete(location._id)}
                                        />
                                    </div>
                                ))
                            }
                        </>
                        :
                        <p className="text-secondary pt-5">Currently no locations have been added. To create a new location click the <b>New Location</b> button above.</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Locations;