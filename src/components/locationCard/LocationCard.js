import React, { useState } from 'react';
import './LocationCard.sass';
import defaultImage from './default.png';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { Link } from 'react-router-dom';

const LocationCard = (props) => {

    const {location} = props;

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
                    {
                        location.isDraft &&
                        <div className="draftBadge position-absolute badge bg-black bg-opacity-75">
                            <h4 className='m-0'>DRAFT</h4>
                        </div>
                    }
                    {
                        location.isPublished &&
                        <div className="draftBadge position-absolute badge bg-primary bg-opacity-75">
                            <h4 className='m-0'>PUBLISHED</h4>
                        </div>
                    }
                    {
                        !location.isDraft && !location.isPublished &&
                        <div className="draftBadge position-absolute badge bg-secondary bg-opacity-75">
                            <h4 className='m-0'>HIDDEN</h4>
                        </div>
                    }
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
                        <Link className='btn btn-primary' to={`/location/${location._id}`}>Manage</Link>
                        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction='left'>
                            <DropdownToggle tag='span'>
                                <button className="btn">
                                    <i className="fas fa-ellipsis-v"></i>
                                </button>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem className='p-0 viewLocationDropdownItem' disabled={!location.isPublished}>
                                    <a
                                        className='text-decoration-none d-block py-1 px-3'
                                        href={`https://contractorsgarage.com/location/${location.slug}`}
                                        target='_blank'
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fas fa-external-link-alt text-primary"></i>&nbsp;
                                        View
                                    </a>
                                </DropdownItem>
                                <DropdownItem onClick={props.onEdit}>
                                    <i className="fas fa-pencil-alt text-success"></i>&nbsp;
                                    Edit
                                </DropdownItem>
                                <DropdownItem onClick={props.onHide} disabled={(!location.isPublished && !location.isDraft) || location.isDraft}>
                                    <i className="fas fa-eye-slash"></i>&nbsp;
                                    Hide Location
                                </DropdownItem>
                                <DropdownItem divider/>
                                <DropdownItem className='text-danger' onClick={props.onDelete}>
                                    <i className="fas fa-trash-alt"></i>&nbsp;
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            }
        </div>
    );
};

export default LocationCard;