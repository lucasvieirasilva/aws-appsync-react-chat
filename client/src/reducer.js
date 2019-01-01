import { combineReducers } from 'redux';
import auth from './reducers/auth';
import common from './reducers/common';
import room from './reducers/room';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    auth,
    common,
    room,
    router: routerReducer
});