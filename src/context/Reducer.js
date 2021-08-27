import { OPEN_PREVIEW, RESET_PREVIEW, SET_TABVIEW, SET_USER, UPDATE_PREVIEW } from "./ActionTypes"

const Reducer = (state, action) => {
    switch (action.type) {
        case SET_USER:
            return {...state, currentUser: action.payload};
        case SET_TABVIEW:
            return {...state, tabView: action.payload};
        case UPDATE_PREVIEW:
            return {...state, previewLocation: action.payload};
        case OPEN_PREVIEW:
            return {...state, openPreview: true};
        case RESET_PREVIEW:
        return {...state, openPreview: false};
        default:
            return state;
    }
}

export default Reducer;