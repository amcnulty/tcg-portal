import React from 'react';
import ReactPlayer from 'react-player/file';

const VideoCard = (props) => {
    return (
        <div className='VideoCard'>
            <div className='card'>
                <div className='card-body'>
                    <ReactPlayer
                        url={props.src}
                        controls
                        width='100%'
                        height='auto'
                        {...(props.poster && {
                            config: {
                                file: {
                                    attributes: {
                                        poster: props.poster
                                    }
                                }
                            }
                        })}
                        fallback={
                            <div className='d-flex justify-content-center align-items-center'>
                                <div className='spinner-border' role='status'>
                                    <span className='visually-hidden'>
                                        Loading...
                                    </span>
                                </div>
                            </div>
                        }
                    />
                </div>
                {(props.onDelete || props.onReorder || props.onEdit) && (
                    <div className='card-footer d-flex flex-row justify-content-between bg-light'>
                        {props.onDelete && (
                            <button
                                type='button'
                                className='btn btn-link text-danger'
                                onClick={props.onDelete}
                                title='Delete'
                            >
                                <i className='fas fa-trash-alt'></i>
                            </button>
                        )}
                        {props.onReorder && (
                            <button
                                type='button'
                                className='btn btn-link text-secondary ms-auto'
                                onClick={props.onReorder}
                                title='Reorder'
                            >
                                <i className='fas fa-sort'></i>
                            </button>
                        )}
                        {props.onEdit && (
                            <button
                                type='button'
                                className='btn btn-link text-secondary'
                                onClick={props.onEdit}
                                title='Edit'
                            >
                                <i className='fas fa-pencil-alt'></i>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoCard;
