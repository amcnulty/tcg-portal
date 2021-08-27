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
        GET('/api/user/is-logged-in', cb);
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
       GET('/portal/locations', cb);
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
    * @param {Object} data Request payload for updating a location
    * @param {Function} cb Callback function that returns response or error of the server request.
    */
   updateLocation: (data, cb) => {
       PUT('/portal/location', data, cb, {type: TOAST_TYPES.SUCCESS, message: 'Update Successful!'});
   },
   /**
    * Creates a location preview record.
    * @param {String} data JSON data representing the location object
    * @param {Function} cb Callback function that returns response or error of the server request.
    */
   createPreview: (data, cb) => {
       POST('/portal/location/preview', data, cb, { type: TOAST_TYPES.SUCCESS, message: 'Preview has been generated!'});
   }
}