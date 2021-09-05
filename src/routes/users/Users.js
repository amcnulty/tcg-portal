import React, { useContext, useEffect, useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { SET_USERS } from '../../context/ActionTypes';
import { AppContext } from '../../context/Store';
import { API } from '../../util/API';
import { HELPERS, TOAST_TYPES } from '../../util/helpers';
import './Users.sass';

const Users = () => {
    const [state, dispatch] = useContext(AppContext);

    // Create user form state
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [isAdmin, setIsAdmin] = useState(false);
    const [maxLocationAllowance, setMaxLocationAllowance] = useState();

    // Create user form validation state
    const [wasValidated, setWasValidated] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState();
    const [passwordErrorMessage, setPasswordErrorMessage] = useState();

    // Modal state
    const [modal, setModal] = useState();
    const [editingUser, setEditingUser] = useState();
    const [maxLocationAllowance_editing, setMaxLocationAllowance_editing] = useState();
        
    useEffect(() => {
        if (!state.allUsers && state.currentUser &&  state.currentUser.isAdmin) {
            getAllUsers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.currentUser]);
    
    const getAllUsers = () => {
        API.getAllUsers((res, err) => {
            if (res && res.status === 200) {
                dispatch({type: SET_USERS, payload: res.data});
            }
        });
    }

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
                username,
                password,
                isAdmin,
                maxLocationAllowance
            }
            API.createUser(request, (res, err) => {
                if (res && res.status === 200) {
                    console.log('success');
                    getAllUsers();
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

    const handleDeleteUser = user => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            API.deleteUser(user._id, (res, err) => {
                if (res && res.status === 200) {
                    console.log('success');
                    getAllUsers();
                }
                else if (err) {
                    console.log(err);
                }
            });
        }
    }

    const handleEditAllowance = user => {
        setEditingUser(user);
        setMaxLocationAllowance_editing(user.maxLocationAllowance)
        toggleModal();
    }

    const handlePasswordChange = e => {
        if (/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d].{5,}$/.test(e.target.value)) {
            e.target.setCustomValidity('');
            setPasswordErrorMessage();
        }
        else {
            e.target.setCustomValidity('Password does not meet requirements. Must be minimum 6 digits long with at least one capital letter one number.');
            setPasswordErrorMessage('Password does not meet requirements. Must be minimum 6 digits long with at least one capital letter one number.');
        }
        setPassword(e.target.value);
    }

    const toggleModal = () => setModal(!modal);

    const handleUpdateAllowance = () => {
        API.updateMaxAllowance(editingUser._id, {maxLocationAllowance: maxLocationAllowance_editing}, (res, err) => {
            if (res && res.status === 200) {
                console.log('success');
                toggleModal();
                getAllUsers();
            }
            else if (err) {
                console.log(err);
            }
        });
    }

    return (
        <div className='Users'>
            <div className="container mb-5 pb-5">
                <h2 className='my-4'>Users</h2>
                <p>Manage and create users here.</p>
                <h4>Current Users</h4>
                {
                    state.allUsers
                    &&
                    state.allUsers.map((user, index) => (
                        <div key={index} className="card my-3 border-secondary">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    {
                                        user.isAdmin
                                        ?
                                        <div className='col-12 col-md-2 d-flex align-items-center'>
                                            <h3 className='d-inline'>
                                                <i className="fas fa-user-tie"></i>
                                            </h3>
                                            <div className="badge bg-success ms-2">ADMIN</div>
                                        </div>
                                        :
                                        <div className="col-12 col-md-2">
                                            <h3>
                                                <i className="fas fa-user"></i>
                                            </h3>
                                        </div>
                                    }
                                    <div className='col-12 col-md-10'>
                                        <span className='fw-bold'>{user.username}</span>
                                        <span className='fw-bold ms-3'>{`- (${user.firstName} ${user.lastName})`}</span>
                                    </div>
                                    {
                                        !user.isAdmin
                                        &&
                                        <div className="col-12 offset-md-2">
                                            <span className="fw-bold">Max Location Allowance: {user.maxLocationAllowance}</span>
                                        </div>
                                    }
                                </div>
                            </div>
                            {
                                ( !user.isAdmin || (state.currentUser && state.currentUser.isSuperAdmin) )
                                &&
                                <div className="card-footer d-flex">
                                    {
                                        ( !user.isAdmin || (state.currentUser && state.currentUser.isSuperAdmin) )
                                        &&
                                        <button className="btn btn-danger" onClick={() => handleDeleteUser(user)}>Delete</button>
                                    }
                                    {
                                        !user.isAdmin
                                        &&
                                        <button className="btn btn-primary ms-auto" onClick={() => handleEditAllowance(user)}>Edit Allowance</button>
                                    }
                                </div>
                            }
                        </div>
                    ))
                }
                <form onSubmit={handleFormSubmit} className={`needs-validation ${wasValidated ? 'was-validated' : ''}`} noValidate>
                    <h4 className='mt-5'>Create New User</h4>
                    <p>Use this form to create a new user.</p>
                    <div className="d-flex flex-column my-4">
                        <div className="form-check form-switch">
                            <input
                                id='isAdmin'
                                className='form-check-input'
                                type="checkbox"
                                checked={isAdmin}
                                onChange={e => setIsAdmin(e.target.checked)}
                            />
                            <label className='form-check-label' htmlFor="isAdmin">Is Admin</label>
                        </div>
                    </div>
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
                    <div className="d-flex flex-column my-4">
                        <label className='form-label requiredField' htmlFor="password">Password</label>
                        <input
                            id='password'
                            className='form-control'
                            type="text"
                            placeholder='Enter Password'
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        <div className="invalid-feedback fw-bold">
                            {
                                passwordErrorMessage
                                ?
                                passwordErrorMessage
                                :
                                'Password is a required field please enter a password above.'
                            }
                        </div>
                    </div>
                    {
                        !isAdmin
                        &&
                        <div className="d-flex flex-column my-4">
                            <label className='form-label requiredField' htmlFor="maxAllowance">Max Location Allowance</label>
                            <small className='text-secondary'>This is how many locations this user will be able to publish according to their subscription level.</small>
                            <input
                                id='maxAllowance'
                                className='form-control'
                                type='number'
                                placeholder='Enter Max Number of Locations'
                                min='0'
                                value={maxLocationAllowance}
                                onChange={e => setMaxLocationAllowance(e.target.value)}
                                required
                            />
                            <div className="invalid-feedback fw-bold">
                                Max location allowance is a required field please enter a value.
                            </div>
                        </div>
                    }
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
            <Modal isOpen={modal} toggle={toggleModal} centered>
                <ModalHeader>
                    Edit Location Allowance
                </ModalHeader>
                <ModalBody>
                    <div className="d-flex flex-column my-4">
                        <label className='form-label requiredField' htmlFor="maxAllowance">Max Location Allowance</label>
                        <small className='text-secondary'>This is how many locations this user will be able to publish according to their subscription level.</small>
                        <input
                            id='maxAllowance'
                            className='form-control'
                            type='number'
                            placeholder='Enter Max Number of Locations'
                            min='0'
                            value={maxLocationAllowance_editing}
                            onChange={e => setMaxLocationAllowance_editing(e.target.value)}
                            required
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn" onClick={toggleModal}>CANCEL</button>
                    <button className="btn btn-primary" onClick={handleUpdateAllowance}>Update</button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Users;