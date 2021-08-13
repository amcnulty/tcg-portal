import React, { useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { API } from '../../util/API';
import './Login.sass';

const Login = () => {
  const [
    redirectToReferrer,
    setRedirectToReferrer
  ] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { state } = useLocation();

  if (redirectToReferrer === true) {
    return <Redirect to={state?.from || '/dashboard'} />
  }

  const handleLogin = (event) => {
    event.preventDefault();
    API.logIn({ username, password }, (res, err) => {
      if (res && res.status === 200) {
        setRedirectToReferrer(true);
      }
      else {
        console.log(err);
      }
    });
  }

  return (
    <div className='Login'>
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
        <button className="btn btn-primary" type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Login;