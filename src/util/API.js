import axios from "axios"

export const API = {
    isLoggedIn: (cb) => {
        axios.get('https://contractorsgarage.com/api/user/is-logged-in')
        .then(res => {
            cb(res);
        }, err => {
            cb(null, err);
        });
    }
}