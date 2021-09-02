import { DELETE_USER, OPEN_PREVIEW, RESET_PREVIEW, SET_BANNER_IMAGE_PENDING, SET_DETAIL_PAGE_IMAGES_PENDING, SET_TABVIEW, SET_USER, UPDATE_PREVIEW } from "./ActionTypes"

const Reducer = (state, action) => {
    switch (action.type) {
        case SET_USER:
            return {...state, currentUser: action.payload};
        case DELETE_USER:
            return {...state, currentUser: null};
        case SET_TABVIEW:
            return {...state, tabView: action.payload};
        case UPDATE_PREVIEW:
            return {...state, previewLocation: action.payload};
        case OPEN_PREVIEW:
            return {...state, openPreview: true};
        case RESET_PREVIEW:
            return {...state, openPreview: false};
        case SET_DETAIL_PAGE_IMAGES_PENDING:
            return {...state, detailPageImages_pending: action.payload};
        case SET_BANNER_IMAGE_PENDING:
            return {...state, bannerImage_pending: action.payload};
        default:
            return state;
    }
}

export default Reducer;