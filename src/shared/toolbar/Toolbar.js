import React, { useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import CompanyLogo from '../../components/companyLogo/CompanyLogo';
import { API } from '../../util/API';
import { AppContext } from '../../context/Store';
import './Toolbar.sass';
import { TAB_GENERAL, TAB_MEDIA, TAB_PAYMENT, TAB_THUMBNAIL, TAB_UNIT } from '../Constants';
import { SET_TABVIEW } from '../../context/ActionTypes';

const Toolbar = () => {
    const location = useLocation();
    const history = useHistory();
    const [state, dispatch] = useContext(AppContext);
        
    const handleLogout = () => {
        API.logOut((res, err) => {
            if (res && res.status === 200) {
                history.push('/');
            }
        });
    }
    
    const isActive = (path) => {
        return path === location.pathname ? 'activeNavText' : '';
    }

    const isTabActive = tabView => {
        return tabView === state.tabView ? 'activeNavText' : '';
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
                {
                    location.pathname.startsWith('/location/') &&
                    <>
                        <hr/>
                        <ul className='list-unstyled'>
                            <li className='mt-2'>
                                <a
                                    className={`text-decoration-none ${isTabActive(TAB_GENERAL)}`}
                                    href={void(0)}
                                    onClick={() => dispatch({type: SET_TABVIEW, payload: TAB_GENERAL})}
                                >
                                    General
                                </a>
                            </li>
                            <li className='mt-2'>
                                <a
                                    className={`text-decoration-none ${isTabActive(TAB_THUMBNAIL)}`}
                                    href={void(0)}
                                    onClick={() => dispatch({type: SET_TABVIEW, payload: TAB_THUMBNAIL})}
                                >
                                    Thumbnail
                                </a>
                            </li>
                            <li className='mt-2'>
                                <a
                                    className={`text-decoration-none ${isTabActive(TAB_UNIT)}`}
                                    href={void(0)}
                                    onClick={() => dispatch({type: SET_TABVIEW, payload: TAB_UNIT})}
                                >
                                    Unit
                                </a>
                            </li>
                            <li className='mt-2'>
                                <a
                                    className={`text-decoration-none ${isTabActive(TAB_MEDIA)}`}
                                    href={void(0)}
                                    onClick={() => dispatch({type: SET_TABVIEW, payload: TAB_MEDIA})}
                                >
                                    Media
                                </a>
                            </li>
                            <li className='mt-2'>
                                <a
                                    className={`text-decoration-none ${isTabActive(TAB_PAYMENT)}`}
                                    href={void(0)}
                                    onClick={() => dispatch({type: SET_TABVIEW, payload: TAB_PAYMENT})}
                                >
                                    Payment
                                </a>
                            </li>
                        </ul>
                    </>
                }
                <button className="btn btn-danger mt-auto" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Toolbar;