import {
    OPEN_CREATE_ROOM,
    CLOSE_CREATE_ROOM,
    CREATE_ROOM_SUCCESS,
    CREATE_ROOM_ERROR,
    REFECTH_ROOMS
} from '../contants/actionTypes';

const initialState = {}

export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_CREATE_ROOM:
            return {
                ...state,
                error: null,
                isOpenCreate: true,
                refetch: false
            };
        case CREATE_ROOM_SUCCESS:
        case CLOSE_CREATE_ROOM:
            return {
                ...state,
                error: null,
                isOpenCreate: false,
                refetch: false
            }
        case CREATE_ROOM_ERROR:
            return {
                ...state,
                error: action.error,
                refetch: false
            }
        case REFECTH_ROOMS:
            return {
                ...state,
                refetch: true
            }
        default:
            return state;
    }
}