import axios from "axios"

const baseUrl = (process.env.NODE_ENV === 'production') ? 'https://contractorsgarage.com' : 'http://localhost:3005';
const config = { withCredentials: true };

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
    isLoggedIn: (cb) => {
        axios.get(baseUrl + '/api/user/is-logged-in', config)
        .then(res => {
            cb(res);
        }, err => {
            cb(null, err);
        });
    },
    /**
     * Logs a user in and creates a session.
     * @param {Object} req Request data with user credentials.
     * @param {Function} cb Callback function that returns response or error of the server request.
     */
    logIn: (req, cb) => {
        axios.post(baseUrl + '/api/user/login', req, config)
        .then(cb, err => cb(null, err));
    },
    /**
     * Logs a user out and destroys the current session.
     * @param {Function} cb Callback function that returns response or error of the server request.
     */
    logOut: (cb) => {
        axios.post(baseUrl + '/api/user/logout', null, config)
        .then(cb, err => cb(null, err));
    },
    
    getAllUsers: (cb) => {
        axios.get(baseUrl + '/portal/user/get-all-users', config)
        .then(cb, err => cb(null, err));
    },
    /*
    *          !!##########################!!
    *          !!                          !!
    *          !!        Locations         !!
    *          !!                          !!
    *          !!##########################!!
    */
   getLocations: (cb) => {
       axios.get(baseUrl + '/portal/locations', config)
       .then(cb, err => cb(null, err));
    },
    /**
     * Gets location data for a specific location for the given Id.
     * @param {String} id Id for the specific location.
     * @param {Function} cb Callback function that returns response or error of the server request.
     */
    getLocationById: (id, cb) => {
        axios.get(`${baseUrl}/portal/location/${id}`, config)
        .then(cb, err => cb(null, err));
   }
}