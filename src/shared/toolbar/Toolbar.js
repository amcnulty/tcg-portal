import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import CompanyLogo from '../../components/companyLogo/CompanyLogo';
import { API } from '../../util/API';
import './Toolbar.sass';

const Toolbar = () => {
    const location = useLocation();
    const history = useHistory();
        
    const handleLogout = () => {
        API.logOut((res, err) => {
            if (res && res.status === 200) {
                history.push('/');
            }
        });
    }
    
    const isActive = (path) => {
        return path === location.pathname ? 'activeNavText': '';
    }

    return (
        <div className='Toolbar toolbarBackground pt-4 d-flex flex-column'>
            <CompanyLogo transparent/>
            <div className="navWrapper mt-5 d-flex flex-column flex-grow-1">
                <ul className='list-unstyled'>
                    <li className='mt-2'>
                        <Link className={`text-decoration-none ${isActive('/dashboard')}`} to='/dashboard'>Dashboard</Link>
                    </li>
                    <li className='mt-2'>
                        <Link className={`text-decoration-none ${isActive('/locations')}`} to='/locations'>Locations</Link>
                    </li>
                    <li className='mt-2'>
                        <Link className={`text-decoration-none ${isActive('/settings')}`} to='/settings'>Settings</Link>
                    </li>
                </ul>
                <button className="btn btn-danger mt-auto" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Toolbar;