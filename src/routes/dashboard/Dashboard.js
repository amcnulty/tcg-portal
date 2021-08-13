import React from 'react';
import { useHistory } from 'react-router-dom';
import { API } from '../../util/API';
import './Dashboard.sass';

const Dashboard = () => {

    const history = useHistory();

    const handleLogout = () => {
        API.logOut((res, err) => {
            if (res && res.status === 200) {
                history.push('/');
            }
        });
    }

    return (
        <div className='Dashboard'>
            Dashboard component works!!! With new changes
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;