import React, { useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import './Login.sass';

const Login = () => {
    const [
      redirectToReferrer,
      setRedirectToReferrer
    ] = useState(false);
  
    const { state } = useLocation();
  
    // Implement code for logging in then setting redirect to referrer to true
    // so last page that was attempted to be visited unauthenticated will be redirected to.
    // const login = () => fakeAuth.authenticate(() => {
    //   setRedirectToReferrer(true)
    // })
  
    if (redirectToReferrer === true) {
      return <Redirect to={state?.from || '/dashboard'} />
    }
    return (
        <div className='Login'>
            Login Component Works!! With latest
        </div>
    );
};

export default Login;