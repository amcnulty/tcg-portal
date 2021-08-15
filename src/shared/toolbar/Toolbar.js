import React from 'react';
import { Link } from 'react-router-dom';
import './Toolbar.sass';

const Toolbar = () => {
    return (
        <div className='Toolbar toolbarBackground'>
            <ul className='list-unstyled'>
                <li>
                    <Link className='text-decoration-none' to='/dashboard'>Dashboard</Link>
                </li>
                <li>
                    <Link className='text-decoration-none' to='/locations'>Locations</Link>
                </li>
                <li>
                    <Link className='text-decoration-none' to='/settings'>Settings</Link>
                </li>
            </ul>
        </div>
    );
};

export default Toolbar;