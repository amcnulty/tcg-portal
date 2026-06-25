import React, { useState } from 'react';
import './LocationCard.sass';
import defaultImage from './default.png';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { HELPERS } from '../../util/helpers';

const LocationCard = (props) => {

    const {location} = props;

    const [dropdownOpen, setDropdownOpen] = useState(false);
  
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const imageSrc = location.thumbnailImage ? location.thumbnailImage.src : defaultImage;

    // Derive the single display state from the location flags (see HELPERS.getLocationStatus).
    const status = HELPERS.getLocationStatus(location);

    return (
        <div className='LocationCard'>
            {
                location &&
                <div
                    className="card"
                >
                    <div className={`draftBadge position-absolute badge ${status.className}`}>
                        <h4 className='m-0'>{status.label}</h4>
                    </div>
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
                                {
                                    location.isPublished &&
                                    <DropdownItem onClick={props.onHide}>
                                        <i className="fas fa-eye-slash"></i>&nbsp;
                                        Hide Location
                                    </DropdownItem>
                                }
                                {
                                    !location.isPublished && !location.isDraft &&
                                    <DropdownItem onClick={props.onPublish}>
                                        <i className="fas fa-eye text-success"></i>&nbsp;
                                        Make Visible
                                    </DropdownItem>
                                }
                                <DropdownItem onClick={props.onComingSoon} disabled={!location.isPublished && !location.comingSoon}>
                                    <i className="fas fa-clock text-info"></i>&nbsp;
                                    {location.comingSoon ? 'Remove Coming Soon' : 'Mark as Coming Soon'}
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