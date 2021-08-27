import React, { useContext } from 'react';
import { SET_TABVIEW } from '../../context/ActionTypes';
import { AppContext } from '../../context/Store';
import { HELPERS } from '../../util/helpers';

const TabView = props => {
    const [state, dispatch] = useContext(AppContext);
    
    const handleTabViewNavClick = (e, tabView) => {
        e.preventDefault();
        dispatch({type: SET_TABVIEW, payload: tabView})
    }

    return (
        <div className='TabView'>
            <div className="mb-5 pb-5">
                <h2 className='my-4'>{props.header}</h2>
                <p>{props.description}</p>
                {props.children}
                <div className="tabViewNavSection d-flex justify-content-between my-5">
                    {
                        props.previousView &&
                        <div className='card p-3'>
                            <a
                                href='/'
                                onClick={e => handleTabViewNavClick(e, props.previousView)}
                            >
                                <i className="fas fa-arrow-left"></i> Previous: {HELPERS.getTabNameFromTabView(props.previousView)}
                            </a>
                        </div>
                    }
                    {
                        props.nextView &&
                        <div className='ms-auto card p-3'>
                            <a
                                href='/'
                                onClick={e => handleTabViewNavClick(e, props.nextView)}
                            >
                                Next: {HELPERS.getTabNameFromTabView(props.nextView)} <i className="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default TabView;