import React, { useContext, useEffect, useState } from 'react';
import { SET_USER } from '../../context/ActionTypes';
import { AppContext } from '../../context/Store';
import { API } from '../../util/API';
import { HELPERS, TOAST_TYPES } from '../../util/helpers';
import './Settings.sass';

const Settings = () => {
    const [state, dispatch] = useContext(AppContext);

    // Basic info state
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [username, setUsername] = useState();

    // Change password state
    const [password, setPassword] = useState();
    const [repeatPassword, setRepeatPassword] = useState();
    const [newPassword, setNewPassword] = useState();

    // Basic info form state
    const [wasValidated, setWasValidated] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState();
    
    // Change password form state
    const [wasValidated_password, setWasValidated_password] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState();
    const [repeatPasswordErrorMessage, setRepeatPasswordErrorMessage] = useState();
    const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState();

    useEffect(() => {
        if (state.currentUser) {
            setFirstName(state.currentUser.firstName);
            setLastName(state.currentUser.lastName);
            setUsername(state.currentUser.username);
        }
    }, [state.currentUser]);

    const handleFormSubmit = e => {
        if (!e.target.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            setUsernameErrorMessage();
            HELPERS.showToast(TOAST_TYPES.WARNING, 'Unable to submit form! One or more fields are invalid.');
        }
        else {
            e.preventDefault();
            const request = {
                firstName,
                lastName,
                username
            };
            API.updateUser(state.currentUser._id, request, (res, err) => {
                if (res && res.status === 200) {
                    console.log('success');
                    dispatch({type: SET_USER, payload: {...state.currentUser, ...request}});
                }
                else if (err) {
                    if (err.response && err.response.status === 400) {
                        e.target.elements.namedItem('username').setCustomValidity('Current username value already in use, username must be unique. Choose another value.');
                        setUsernameErrorMessage('Current username value already in use, username must be unique. Choose another value.');
                    }
                    console.log(err);
                }
            });
        }
        setWasValidated(true);
    }
    const handleFormSubmit_password = e => {
        if (!e.target.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            setPasswordErrorMessage();
            HELPERS.showToast(TOAST_TYPES.WARNING, 'Unable to submit form! One or more fields are invalid.');
        }
        else {
            e.preventDefault();
            const request = {
                password,
                newPassword
            };
            API.changePassword(state.currentUser._id, request, (res, err) => {
                if (res && res.status === 200) {
                    console.log('success');
                }
                else if (err) {
                    if (err.response && err.response.status === 400) {
                        e.target.elements.namedItem('password').setCustomValidity('Password not recognized!');
                        setPasswordErrorMessage('Password not recognized!');
                    }
                    console.log(err);
                }
            });
        }
        setWasValidated_password(true);
    }

    const handleResetPasswordChange = e => {
        if (e.target.value === password) {
            e.target.setCustomValidity('');
            setRepeatPasswordErrorMessage();
        }
        else {
            e.target.setCustomValidity('Passwords do not match!');
            setRepeatPasswordErrorMessage('Passwords do not match!');
        }
        setRepeatPassword(e.target.value);
    }

    const handleNewPasswordChange = e => {
        if (/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d].{5,}$/.test(e.target.value)) {
            e.target.setCustomValidity('');
            setNewPasswordErrorMessage();
        }
        else {
            e.target.setCustomValidity('Password does not meet requirements. Must be minimum 6 digits long with at least one capital letter one number.');
            setNewPasswordErrorMessage('Password does not meet requirements. Must be minimum 6 digits long with at least one capital letter one number.');
        }
        setNewPassword(e.target.value);
    }

    return (
        <div className='Settings'>
            <div className="container mb-5 pb-5">
                <h2 className='my-4'>Settings</h2>
                <p>Update your profile information here.</p>
                <form onSubmit={handleFormSubmit} className={`needs-validation ${wasValidated ? 'was-validated' : ''}`} noValidate>
                    <h4>Basic Information</h4>
                    <div className="d-flex flex-column my-4">
                        <label className='form-label requiredField' htmlFor="firstName">First Name</label>
                        <input
                            id='firstName'
                            className='form-control'
                            type="text"
                            placeholder='Enter First Name'
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            required
                        />
                        <div className="invalid-feedback fw-bold">
                            First Name is a required field please enter a first name above.
                        </div>
                    </div>
                    <div className="d-flex flex-column my-4">
                        <label className='form-label requiredField' htmlFor="lastName">Last Name</label>
                        <input
                            id='lastName'
                            className='form-control'
                            type="text"
                            placeholder='Enter Last Name'
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            required
                        />
                        <div className="invalid-feedback fw-bold">
                            Last Name is a required field please enter a last name above.
                        </div>
                    </div>
                    <div className="d-flex flex-column my-4">
                        <label className='form-label requiredField' htmlFor="username">Username</label>
                        <input
                            id='username'
                            className='form-control'
                            type="text"
                            placeholder='Enter Username'
                            value={username}
                            onChange={e => {e.target.setCustomValidity(''); setUsername(e.target.value);}}
                            required
                        />
                        <div className="invalid-feedback fw-bold">
                            {
                                usernameErrorMessage
                                ?
                                usernameErrorMessage
                                :
                                'Username is a required field please enter a username above.'
                            }
                        </div>
                    </div>
                    <button className="btn btn-primary" type='submit'>Submit</button>
                </form>
                <form onSubmit={handleFormSubmit_password} className={`needs-validation ${wasValidated_password ? 'was-validated' : ''}`} noValidate>
                    <h4 className='mt-5'>Change Password</h4>
                    <div className="d-flex flex-column my-4">
                        <label className='form-label requiredField' htmlFor="password">Password</label>
                        <input
                            id='password'
                            className='form-control'
                            type="password"
                            placeholder='Enter Password'
                            value={password}
                            onChange={e => {e.target.setCustomValidity(''); setPassword(e.target.value);}}
                            required
                        />
                        <div className="invalid-feedback fw-bold">
                            {
                                passwordErrorMessage
                                ?
                                passwordErrorMessage
                                :
                                'Password is a required field please enter a password above.'                            }
                        </div>
                    </div>
                    <div className="d-flex flex-column my-4">
                        <label className='form-label requiredField' htmlFor="repeatPassword">Confirm Password</label>
                        <input
                            id='repeatPassword'
                            className='form-control'
                            type="password"
                            placeholder='Confirm Password'
                            value={repeatPassword}
                            onChange={handleResetPasswordChange}
                            required
                        />
                        <div className="invalid-feedback fw-bold">
                            {
                                repeatPasswordErrorMessage
                                ?
                                repeatPasswordErrorMessage
                                :
                                'Must confirm old password in order to change your password.'
                            }
                        </div>
                    </div>
                    <div className="d-flex flex-column my-4">
                        <label className='form-label requiredField' htmlFor="newPassword">New Password</label>
                        <input
                            id='newPassword'
                            className='form-control'
                            type="password"
                            placeholder='Enter New Password'
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            required
                        />
                        <div className="invalid-feedback fw-bold">
                            {
                                newPasswordErrorMessage
                                ?
                                newPasswordErrorMessage
                                :
                                'Password is a required field please enter a new password above.'
                            }
                        </div>
                    </div>
                    <button className="btn btn-primary" type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Settings;