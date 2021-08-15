import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

const MobileHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    
    const toggle = () => setIsOpen(!isOpen);

    const isActive = (path) => {
        return path === location.pathname ? 'active': '';
    }
    return (
        <div className='MobileHeader'>
            <Navbar light expand="md" className='justify-content-between'>
                <NavbarBrand className='p-0' tag={Link} to='/'>
                    {/* <CompanyLogo /> */}CG
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
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default MobileHeader;