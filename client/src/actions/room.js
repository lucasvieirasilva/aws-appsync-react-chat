import {
    OPEN_CREATE_ROOM,
    CLOSE_CREATE_ROOM,
    CREATE_ROOM_SUCCESS,
    CREATE_ROOM_ERROR,
    REFECTH_ROOMS
} from '../contants/actionTypes';
import { setProgress } from './common';

export const openCreateRoom = () => ({ type: OPEN_CREATE_ROOM })

export const closeCreateRoom = () => ({ type: CLOSE_CREATE_ROOM })

export const createRoom = (name, visibility, mutate) => {
    return dispatch => {
        dispatch(setProgress(true));

        const params = {
            variables: { name, visibility }
        }

        mutate(params)
            .then(() => {
                dispatch({ type: CREATE_ROOM_SUCCESS });
                dispatch({ type: REFECTH_ROOMS });
                dispatch(setProgress(true));
            })
            .catch((error) => {
                dispatch({ type: CREATE_ROOM_ERROR, error });
                dispatch(setProgress(true));
            })
    }
}