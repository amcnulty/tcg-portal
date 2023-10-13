import axios from "axios"
import { HELPERS, TOAST_TYPES } from "./helpers";

const baseUrl = (process.env.NODE_ENV === 'production') ? 'https://www.contractorsgarage.com' : 'http://localhost:3005';
const config = { withCredentials: true };

const GET = (endpoint, cb, successToastData, suppressErrorToast) => {
    axios.get(baseUrl + endpoint, config)
    .then(res => {
        successToastData && HELPERS.showToast(successToastData.type, successToastData.message);
        cb(res);
    }, (err) => {
        suppressErrorToast ?? HELPERS.showToast(TOAST_TYPES.ERROR, err.response);
        cb(null, err);
    });
}

const POST = (endpoint, data, cb, successToastData, suppressErrorToast) => {
    axios.post(baseUrl + endpoint, data, config)
    .then(res => {
        successToastData && HELPERS.showToast(successToastData.type, successToastData.message);
        cb(res);
    }, (err) => {
        suppressErrorToast ?? HELPERS.showToast(TOAST_TYPES.ERROR, err.response);
        cb(null, err);
    });
}

const PUT = (endpoint, data, cb, successToastData, suppressErrorToast) => {
    axios.put(baseUrl + endpoint, data, config)
    .then(res => {
        successToastData && HELPERS.showToast(successToastData.type, successToastData.message);
        cb(res);
    }, (err) => {
        suppressErrorToast ?? HELPERS.showToast(TOAST_TYPES.ERROR, err.response);
        cb(null, err);
    });
}

const DELETE = (endpoint, cb, successToastData, suppressErrorToast) => {
    axios.delete(baseUrl + endpoint, config)
    .then(res => {
        successToastData && HELPERS.showToast(successToastData.type, successToastData.message);
        cb(res);
    }, (err) => {
        suppressErrorToast ?? HELPERS.showToast(TOAST_TYPES.ERROR, err.response);
        cb(null, err);
    });
}

export const API = {
    /*
    *          !!##########################!!
    *          !!                          !!
    *          !!          Users           !!
    *          !!                          !!
    *          !!##########################!!
    */
    /**
     * Checks if a user is currently logged in with a session.
     * @param {Function} cb Callback function that returns response or error of the server request.
     */
    isLoggedIn(cb) {
        GET('/api/user/is-logged-in', cb, null, true);
    },
    /**
     * Logs a user in and creates a session.
     * @param {Object} req Request data with user credentials.
     * @param {Function} cb Callback function that returns response or error of the server request.
     */
    logIn: (req, cb) => {
        POST('/api/user/login', req, cb);
    },
    /**
     * Logs a user out and destroys the current session.
     * @param {Function} cb Callback function that returns response or error of the server request.
     */
    logOut: (cb) => {
        POST('/api/user/logout', null, cb);
    },
    
    getAllUsers: (cb) => {
        GET('/portal/user/get-all-users', cb, null, true);
    },
    /**
     * Updates the user record that matches the given id with the given data.
     * @param {String | Number} id Id of the user to update.
     * @param {Object} data Request object containing the fields to update on the user record.
     * @param {Function} cb Callback function that returns response or error of the server request.
     */
    updateUser: (id, data, cb) => {
        PUT(`/portal/user/${id}`, data, cb, {type: TOAST_TYPES.SUCCESS, message: 'User data successfully updated!'});
    },
    /**
     * Updates the password for the given user id with the given data.
     * @param {String | Number} id Id of the user to update.
     * @param {Object} data Request object containing the password update information.
     * @param {Function} cb Callback function that returns response or error of the server request.
     */
    changePassword: (id, data, cb) => {
        PUT(`/portal/user/change-password/${id}`, data, cb, {type: TOAST_TYPES.SUCCESS, message: 'Password updated successfully!'});
    },
    /**
     * Creates a new user with the given data.
     * @param {Object} data Request object containing the data for creating the new user.
     * @param {Function} cb Callback function that returns response or error of the server request.
     */
    createUser: (data, cb) => {
        POST('/portal/user/create', data, cb, {type: TOAST_TYPES.SUCCESS, message: 'User created successfully!'});
    },
    /**
     * Deletes a user record with the given id.
     * @param {String | Number} id Id of the user to delete.
     * @param {Function} cb Callback function that returns response or error of the server request.
     */
    deleteUser: (id, cb) => {
        DELETE(`/portal/user/${id}`, cb, {type: TOAST_TYPES.SUCCESS, message: 'User deleted Successfully!'});
    },
    /**
     * Updates the max location allowance of the user with the given id to the value passed into the data object.
     * @param {String | Number} id Id of the user to update.
     * @param {Object} data Request object containing the data for updating the max location allowance.
     * @param {Function} cb Callback function that returns response or error of the server request.
     */
    updateMaxAllowance: (id, data, cb) => {
        PUT(`/portal/user/max-allowance/${id}`, data, cb, {type: TOAST_TYPES.SUCCESS, message: 'User Updated Successfully!'});
    },
    /*
    *          !!##########################!!
    *          !!                          !!
    *          !!        Locations         !!
    *          !!                          !!
    *          !!##########################!!
    */
   /**
    * Gets all locations for user access level.
    * @param {Function} cb Callback function that returns response or error of the server request.
    */
    getLocations: (cb) => {
        GET('/portal/locations', cb, null, true);
    },
    /**
     * Gets location data for a specific location for the given Id.
     * @param {String} id Id for the specific location.
     * @param {Function} cb Callback function that returns response or error of the server request.
     */
    getLocationById: (id, cb) => {
        GET(`/portal/location/${id}`, cb);
    },
    /**
     * Creates a location with the given payload. Make sure payload is in the form of the location record.
     * @param {Object} data Request payload for creating a location
     * @param {Function} cb Callback function that returns response or error of the server request.
     */
    createLocation: (data, cb) => {
        POST('/portal/location', data, cb, {type: TOAST_TYPES.SUCCESS, message: 'Location Created!'});
    },
    /**
    * Updates a location with the given payload. Make sure payload is in the form of the location record.
    * @param {Object} data Request payload for updating a location.
    * @param {Function} cb Callback function that returns response or error of the server request.
    */
    updateLocation: (data, cb) => {
        PUT('/portal/location', data, cb, {type: TOAST_TYPES.SUCCESS, message: 'Update Successful!'});
    },
    /**
    * Updates a location with the given payload. Make sure payload is in the form of the location record.
    * This method will not show a toast message on success.
    * @param {Object} data Request payload for updating a location.
    * @param {Function} cb Callback function that returns response or error of the server request.
    */
    updateLocation_hideToast: (data, cb) => {
        PUT('/portal/location', data, cb);
    },
    /**
    * Creates a location preview record.
    * @param {String} data JSON data representing the location object
    * @param {Function} cb Callback function that returns response or error of the server request.
    */
    createPreview: (data, cb) => {
        POST('/portal/location/preview', data, cb, { type: TOAST_TYPES.SUCCESS, message: 'Preview has been generated!'});
    },
    /**
     * Hides a location by unpublishing it based on the given id.
     * @param {String} id Id of the location to hide.
     * @param {Function} cb Callback function that returns response or error of the server request.
     */
    hideLocation: (id, cb) => {
        POST(`/portal/location/hide/${id}`, null, cb, { type: TOAST_TYPES.SUCCESS, message: 'Location has been hidden.'});
    },
    /**
     * Deletes a location with the given id.
     * @param {String} id Id of the location to delete.
     * @param {Function} cb Callback function that returns response or error of the server request.
     */
    deleteLocation: (id, cb) => {
        DELETE(`/portal/location/${id}`, cb, { type: TOAST_TYPES.SUCCESS, message: 'Location has been deleted.'});
    },
    /*
    *          !!##########################!!
    *          !!                          !!
    *          !!          Images          !!
    *          !!                          !!
    *          !!##########################!!
    */
    uploadImages: (files, cb) => {
        const promiseArray = [];
        axios.get(baseUrl + '/portal/image-upload-credentials', config)
        .then(res => {
            for (let i = 0; i < files.length; i++) {
                const tags = ['TCG', 'Portal Upload'];
                const formData = new FormData();
                formData.append('file', files[i]);
                formData.append('tags', tags);
                formData.append('upload_preset', res.data.UPLOAD_PRESET);
                formData.append('api key', res.data.API_KEY);
                formData.append('timestamp', (Date.now() / 1000) | 0);

                promiseArray.push(axios.post(`https://api.cloudinary.com/v1_1/${res.data.CLOUD_NAME}/image/upload`, formData, {
                    headers: { "X-Requested-With": "XMLHttpRequest" }
                }));

            }
            
            return Promise.all(promiseArray);
        })
        .then(cb)
        .catch(err => {
            HELPERS.showToast(TOAST_TYPES.ERROR, err.response);
            cb(null, err);
        });
    },
    /*
    *          !!##########################!!
    *          !!                          !!
    *          !!          Videos          !!
    *          !!                          !!
    *          !!##########################!!
    */
    uploadVideo: (file, cb) => {
        axios.get(baseUrl + '/portal/image-upload-credentials', config)
        .then(res => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', res.data.VIDEO_UPLOAD_PRESET);
            formData.append('api key', res.data.API_KEY);
            formData.append('timestamp', (Date.now() / 1000) | 0);

            return axios.post(
                `https://api.cloudinary.com/v1_1/${res.data.CLOUD_NAME}/video/upload`,
                formData,
                {
                    headers: { "X-Requested-With": "XMLHttpRequest" }
                }
            )
        })
        .then(cb)
        .catch(err => {
            HELPERS.showToast(TOAST_TYPES.ERROR, err.response);
            cb(null, err);
        });
    }
}