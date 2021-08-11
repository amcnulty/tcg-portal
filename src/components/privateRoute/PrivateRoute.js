import React, { useEffect, useState } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { API } from '../../util/API';

const PrivateRoute = ({ children, ...rest }) => {
    const [renderChildren, setRenderChildren] = useState();
    const location = useLocation();

    useEffect(() => {
        API.isLoggedIn((res, err) => {
            if (res && res.status === 200) {
                setRenderChildren(children);
            } else {
                setRenderChildren(<Redirect to={{
                    pathname: '/',
                    state: { from: location }
                }}/>);
            }
        });
    }, []);

    return (
        <Route {...rest} render={() => {
            return renderChildren;
        }}/>
    );
};

export default PrivateRoute;