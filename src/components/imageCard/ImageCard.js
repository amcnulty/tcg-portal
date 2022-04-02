import React from 'react';

const ImageCard = (props) => {
    return (
        <div className='ImageCard'>
            <div className="card">
                <div
                    className="card-body"
                    style={
                        {
                            backgroundImage: "url(" + props.src + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            minHeight: '250px'
                        }
                    }
                />
                <p className='position-absolute bg-white'>{props.caption}</p>
                <div className="card-footer d-flex flex-row justify-content-between bg-light">
                    <button type='button' className="btn btn-link text-danger" onClick={props.onDelete} title='Delete'>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                    {
                        props.onReorder &&
                        <button type='button' className="btn btn-link text-secondary ms-auto" onClick={props.onReorder} title='Reorder'>
                            <i className="fas fa-sort"></i>
                        </button>
                    }
                    {
                        props.hideEdit ??
                        <button type='button' className="btn btn-link text-secondary" onClick={props.onEdit} title='Edit'>
                            <i className="fas fa-pencil-alt"></i>
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default ImageCard;