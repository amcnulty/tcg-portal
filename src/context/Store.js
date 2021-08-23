import { createContext, useReducer } from 'react';
import { TAB_GENERAL } from '../shared/Constants';
import Reducer from './Reducer';

const initialState = {
    currentUser: null,
    tabView: TAB_GENERAL
}

const Store = (props) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <AppContext.Provider value={[state, dispatch]}>
            {props.children}
        </AppContext.Provider>
    )
}

export const AppContext = createContext(initialState);

export default Store;