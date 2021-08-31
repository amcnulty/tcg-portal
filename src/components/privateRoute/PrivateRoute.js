import React, { useContext, useEffect, useState } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { SET_USER } from '../../context/ActionTypes';
import { AppContext } from '../../context/Store';
import { API } from '../../util/API';

const PrivateRoute = ({ children, ...rest }) => {
    const [renderChildren, setRenderChildren] = useState();
    const location = useLocation();
    const [state, dispatch] = useContext(AppContext);

    useEffect(() => {
        if (!state.currentUser) {
            API.isLoggedIn((res, err) => {
                if (res && res.status === 200) {
                    setRenderChildren(children);
                    dispatch({type: SET_USER, payload: res.data});
                }
                else {
                    setRenderChildren(<Redirect to={{
                        pathname: '/login',
                        state: { from: location }
                    }}/>);
                }
            });
        }
        else {
            setRenderChildren(children);
        }
    }, [rest.path]);

    return (
        <Route {...rest} render={() => {
            return renderChildren;
        }}/>
    );
};

export default PrivateRoute;