import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LocationCard from '../../components/locationCard/LocationCard';
import { AppContext } from '../../context/Store';
import { API } from '../../util/API';
import './Locations.sass';

const Locations = () => {
    const [state, dispatch] = useContext(AppContext);
    const history = useHistory();
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        API.getLocations((res, err) => {
            if (res && res.status === 200) {
                setLocations(res.data);
            }
        });
    }, []);

    const handleNewLocation = () => {
        history.push('/location/new');
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
                            (state.currentUser && state.currentUser.isAdmin) || (state.currentUser && state.currentUser.maxLocationAllowance > locations.length)
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
                                    Please contact your administrator to request an increase in your max location allowance. For more information about listing with Contractors Garage visit the <a href='https://www.contractorsgarage.com/development-services' target='_blank'>List With Us</a> page.
                                </p>
                            </>
                        }
                    </div>
                </div>
                <div className="row mb-5 pb-5">
                    {
                        locations && locations.length > 0
                        ?
                        <>
                            <h4>Your Locations</h4>
                            {
                                locations.map(location => (
                                    <div className="col-12 col-md-6 col-xxl-4 my-2" key={location._id}>
                                        <LocationCard location={location}/>
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