import React from 'react';
import { HELPERS } from '../../util/helpers';
import './UnitCard.sass';

const UnitCard = props => {
    const {unit} = props;
    // A date that has already passed is not an error — the live site just shows the
    // unit as available now — but the owner is told so they can tidy it up.
    const hasFutureDate = HELPERS.isFutureDate(unit.availableDate);
    const hasPastDate = unit.availableDate && !hasFutureDate;
    return (
        <div className='UnitCard'>
            <div className="card">
                <div className="card-header d-flex flex-row align-items-center p-2 bg-light">
                    <b className='me-auto'>{unit.unitName ? unit.unitName : '(unnamed)'}</b>
                    <button type='button' className="btn btn-link text-secondary" onClick={props.onEditClick}>
                        <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button type='button' className="btn btn-link text-danger" onClick={props.onDeleteClick}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
                {
                    props.showAvailable &&
                    <div className="card-header p-2">
                        <button
                            type='button'
                            className={`availableButton ${unit.available ? 'available' : ''}`}
                            onClick={props.onAvailableClick}
                        ></button>
                        <span className='fw-bold ms-3'>{unit.available ? 'Available' : 'Unavailable'}</span>
                        {
                            unit.available && hasFutureDate &&
                            <span className='ms-3 badge themeBackground text-white'>Available {HELPERS.formatAvailableDate(unit.availableDate)}</span>
                        }
                        {
                            unit.available && hasPastDate &&
                            <span className='ms-3 small text-secondary fst-italic'>
                                {HELPERS.formatAvailableDate(unit.availableDate)} has passed &mdash; showing as available now
                            </span>
                        }
                    </div>
                }
                <div className="card-body row">
                    <div className="col-12 col-sm-6">
                        <label className='fw-bold text-secondary'>Rent:</label>
                        <span className="ms-3">{unit.monthlyRent ? `$${unit.monthlyRent}` : '-'}</span>
                    </div>
                    <div className="col-12 col-sm-6">
                        <label className='fw-bold text-secondary'>Width:</label>
                        <span className="ms-3">{unit.width ? `${unit.width}ft` : '-'}</span>
                    </div>
                    <div className="col-12 col-sm-6">
                        <label className='fw-bold text-secondary'>Height:</label>
                        <span className="ms-3">{unit.height ? unit.height : '-'}</span>
                    </div>
                    <div className="col-12 col-sm-6">
                        <label className='fw-bold text-secondary'>Depth:</label>
                        <span className="ms-3">{unit.depth ? `${unit.depth}ft` : '-'}</span>
                    </div>
                    <div className="col-12 col-sm-6">
                        <label className='fw-bold text-secondary'>SQ FT:</label>
                        <span className="ms-3">{unit.squareFeet ? `${unit.squareFeet}sqft` : '-'}</span>
                    </div>
                    {
                        !props.hideTotal &&
                        <div className="col-12 col-sm-6">
                            <label className='fw-bold text-secondary'>Total #:</label>
                            <span className="ms-3">{unit.numberOfUnitsByType ? unit.numberOfUnitsByType : '-'}</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default UnitCard;