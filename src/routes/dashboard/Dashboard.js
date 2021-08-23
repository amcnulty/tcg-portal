import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/Store';
import { API } from '../../util/API';
import './Dashboard.sass';

const Dashboard = () => {
    const [locations, setLocations] = useState([]);
    const [users, setUsers] = useState([]);
    const [state, dispatch] = useContext(AppContext);

    useEffect(() => {
        API.getLocations((res, err) => {
            if (res && res.status === 200) {
                setLocations(res.data);
            }
        });
        API.getAllUsers((res, err) => {
            if (res && res.status === 200) {
                setUsers(res.data);
            }
        });
    }, []);

    return (
        <div className='Dashboard'>
            <div className="container">
                <h1 className='my-4'>Welcome, {state.currentUser && state.currentUser.firstName}</h1>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="card p-5 mb-3 mb-md-0">
                            <h3>Number of Locations</h3>
                            <h5 className='fw-bold themeText'>{locations.length}</h5>
                            <Link to='/locations'>Manage Locations</Link>
                        </div>
                    </div>
                    {
                        state.currentUser && state.currentUser.isAdmin
                        &&
                        <div className="col-12 col-md-6">
                            <div className="card p-5">
                                <h3>Number of Users</h3>
                                <h5 className='fw-bold themeText'>{users.length}</h5>
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