import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player/file';

const VideoCard = (props) => {
    const [uniqueKey, setUniqueKey] = useState();
    const posterRef = useRef(props.poster);

    const generateUniqueKey = useCallback(() => {
        const timestamp = new Date().getTime(); // Get a timestamp
        const random = Math.random().toString(36).substring(7); // Generate a random string

        // Combine the timestamp and random string to create a unique key
        const uniqueKey = `${timestamp}-${random}`;

        return uniqueKey;
    }, []);

    useEffect(() => {
        if (props.poster !== posterRef.current) {
            posterRef.current = props.poster;
            setUniqueKey(generateUniqueKey());
        }
    }, [generateUniqueKey, props.poster]);

    return (
        <div className='VideoCard'>
            <div className='card'>
                <div className='card-body'>
                    <ReactPlayer
                        key={props.poster ? uniqueKey : 'withoutPoster'}
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
