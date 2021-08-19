import React, { useState } from 'react';
import './LocationCard.sass';
import defaultImage from './default.png';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

const LocationCard = ({location}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
  
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const imageSrc = location.thumbnailImage ? location.thumbnailImage.src : defaultImage;

    return (
        <div className='LocationCard'>
            {
                location &&
                <div
                    className="card"
                >
                    <div className="card-header themeBackground">
                        <h3>{location.name}</h3>
                    </div>
                    <div className="card-body"
                        style={
                            {
                                backgroundImage: "url(" + imageSrc + ")",
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                minHeight: '250px'
                            }
                        }
                    >
                        <div className="shadowFade">
                            <address className='p-3 fw-bold'>
                                <p className='m-0'>{location.addressFirstLine ? location.addressFirstLine : '[address first line]'}</p>
                                <p>{location.addressSecondLine ? location.addressSecondLine : '[address second line]'}</p>
                            </address>
                        </div>
                    </div>
                    <div className="card-footer cardFooterBackground d-flex justify-content-between">
                        <button className="btn btn-primary">Manage</button>
                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle tag='span'>
                                <button className="btn">
                                    <i className="fas fa-ellipsis-v"></i>
                                </button>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>View</DropdownItem>
                                <DropdownItem>Edit</DropdownItem>
                                <DropdownItem>Hide Location</DropdownItem>
                                <DropdownItem divider/>
                                <DropdownItem>Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            }
        </div>
    );
};

export default LocationCard;