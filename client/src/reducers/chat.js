import {
    CHAT_CHANGE_MESSAGE,
    CHAT_SEND_MESSAGE
} from '../contants/actionTypes';

const initialState = {
    message: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CHAT_CHANGE_MESSAGE:
            return {
                ...state,
                message: action.value
            };
        case CHAT_SEND_MESSAGE:
            return {
                ...state,
                message: ''
            }
        default:
            return state;
    }
}