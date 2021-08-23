import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Collapse, DropdownItem, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import CompanyLogo from '../../components/companyLogo/CompanyLogo';
import { API } from '../../util/API';
import './MobileHeader.sass';

const MobileHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const history = useHistory();
    
    const handleLogout = () => {
        API.logOut((res, err) => {
            if (res && res.status === 200) {
                history.push('/');
            }
        });
    }
    
    const toggle = () => setIsOpen(!isOpen);

    const isActive = (path) => {
        return path === location.pathname ? 'active': '';
    }
    return (
        <div className='MobileHeader'>
            <Navbar light expand="md" className='justify-content-between'>
                <NavbarBrand className='p-0' tag={Link} to='/'>
                    <CompanyLogo square />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink onClick={toggle} tag={Link} to="/dashboard" className={isActive('/dashboard')}>Dashboard</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={toggle} tag={Link} to="/locations" className={isActive('/locations')}>Locations</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={toggle} tag={Link} to="/settings" className={isActive('/settings')}>Settings</NavLink>
                        </NavItem>
                        <DropdownItem divider/>
                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default MobileHeader;