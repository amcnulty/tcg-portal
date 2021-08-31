import React, { useContext, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { SET_USER } from '../../context/ActionTypes';
import { AppContext } from '../../context/Store';
import { API } from '../../util/API';
import CompanyLogo from '../../components/companyLogo/CompanyLogo';
import './Login.sass';

const Login = () => {
  const [
    redirectToReferrer,
    setRedirectToReferrer
  ] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [state, dispatch] = useContext(AppContext);

  const { state: locationState } = useLocation();

  if (redirectToReferrer === true) {
    return <Redirect to={locationState?.from || '/dashboard'} />
  }

  const handleLogin = (event) => {
    event.preventDefault();
    API.logIn({ username, password }, (res, err) => {
      if (res && res.status === 200) {
        dispatch({type: SET_USER, payload: res.data});
        setRedirectToReferrer(true);
      }
      else {
        console.log(err);
      }
    });
  }

  return (
    <div className='Login d-flex flex-column h-100 justify-content-lg-center'>
      <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4 mt-5 mt-lg-0 mb-lg-5">
        <div className='text-center'>
          <CompanyLogo transparent/>
        </div>
        <h2 className='text-center mb-4'>
          ADMIN PORTAL
        </h2>
        <form onSubmit={handleLogin}>
          <div className='mb-3'>
            <label htmlFor='username' className='form-label'>Username</label>
            <input
              id='username'
              className='form-control'
              type='text'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>Password</label>
            <input
              id='password'
              className='form-control'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}  
            />
          </div>
          <button className="btn btn-primary form-control mt-4" type='submit'>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;