import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SET_USERS } from '../../context/ActionTypes';
import { AppContext } from '../../context/Store';
import { API } from '../../util/API';
import './Dashboard.sass';

const Dashboard = () => {
    const [state, dispatch] = useContext(AppContext);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        API.getLocations((res, err) => {
            if (res && res.status === 200) {
                setLocations(res.data);
            }
        });
    }, []);
    
    useEffect(() => {
        if (!state.allUsers && state.currentUser &&  state.currentUser.isAdmin) {
            API.getAllUsers((res, err) => {
                if (res && res.status === 200) {
                    dispatch({type: SET_USERS, payload: res.data});
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.currentUser]);

    return (
        <div className='Dashboard'>
            <div className="container">
                <h1 className='my-4'>Welcome, {state.currentUser && state.currentUser.firstName}</h1>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="card p-5 mb-3 mb-md-0">
                            <h3>Published Locations</h3>
                            <h5 className='fw-bold themeText'>{locations.filter(location => location.isPublished).length}</h5>
                            <h3>Drafts</h3>
                            <h5 className='fw-bold themeText'>{locations.filter(location => location.isDraft).length}</h5>
                            <h3>Inactive Locations</h3>
                            <h5 className='fw-bold themeText'>{locations.filter(location => !location.isDraft && !location.isPublished).length}</h5>
                            <Link to='/locations'>Manage Locations</Link>
                        </div>
                    </div>
                    {
                        state.currentUser && state.currentUser.isAdmin
                        &&
                        <div className="col-12 col-md-6">
                            <div className="card p-5">
                                <h3>Admin Users</h3>
                                <h5 className='fw-bold themeText'>{state.allUsers && state.allUsers.filter(user => user.isAdmin).length}</h5>
                                <h3>Normal Users</h3>
                                <h5 className='fw-bold themeText'>{state.allUsers && state.allUsers.filter(user => !user.isAdmin).length}</h5>
                                <Link to='/users'>Manage Users</Link>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Dashboard;