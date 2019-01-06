import { combineReducers } from 'redux';
import auth from './reducers/auth';
import common from './reducers/common';
import chat from './reducers/chat';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    auth,
    common,
    chat,
    router: routerReducer
});