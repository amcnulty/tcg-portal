import axios from "axios"
import { HELPERS, TOAST_TYPES } from "./helpers";

const baseUrl = (process.env.NODE_ENV === 'production') ? 'https://contractorsgarage.com' : 'http://localhost:3005';
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
    /*
    *          !!##########################!!
    *          !!                          !!
    *          !!        Locations         !!
    *          !!                          !!
    *          !!##########################!!
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
            HELPERS.showToast(TOAST_TYPES.ERROR, 'Error uploading images to server!');
            cb(null, err);
        });
    }
}