import { SET_TABVIEW, SET_USER } from "./ActionTypes"

const Reducer = (state, action) => {
    switch (action.type) {
        case SET_USER:
            return {...state, currentUser: action.payload};
        case SET_TABVIEW:
            return {...state, tabView: action.payload};
        default:
            return state;
    }
}

export default Reducer;