import {
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    CONFIRM_ERROR,
    CONFIRM_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_ERROR
} from '../contants/actionTypes';
import { Auth } from 'aws-amplify';
import { setProgress, redirectTo } from './common';

export const login = (email, password, apolloCreateUser) => {
    return dispatch => {
        dispatch(setProgress(true));
        const params = {
            username: email,
            password: password
        }
        
        Auth.signIn(params)
            .then((data) => {
                apolloCreateUser({
                    variables: {
                        email: email
                    }
                }).then(() => {
                    dispatch(setProgress(false));
                    dispatch({ type: LOGIN_SUCCESS, user: data });
                    dispatch(redirectTo('/home'));
                }).catch((error) => {
                    dispatch(setProgress(false));
                    dispatch({ type: LOGIN_ERROR, error: error });
                });                
            })
            .catch((error) => { 
                if (error.code === "UserNotConfirmedException") {
                    dispatch({ type: REGISTER_SUCCESS, user: { username: email }})
                    dispatch(setProgress(false));
                    dispatch(redirectTo('/confirm'));
                } else {
                    dispatch(setProgress(false));
                    dispatch({ type: LOGIN_ERROR, error: error });
                }                
            });
        }
}

export const confirm = (email, code) => {
    return dispatch => {
        dispatch(setProgress(true));
        
        Auth.confirmSignUp(email, code)
            .then((data) => {
                dispatch(setProgress(false));
                dispatch({ type: CONFIRM_SUCCESS });
                dispatch(redirectTo('/login'));
            })
            .catch((error) => { 
                dispatch(setProgress(false));
                dispatch({ type: CONFIRM_ERROR, error: error });
            });
        }
}

export const register = (email, password) => {
    return dispatch => {
        dispatch(setProgress(true));
        const params = {
            username: email,
            password: password,
            attributes: {
                email: email,
            }
        }

        Auth.signUp(params)
            .then((data) => {
                dispatch({ type: REGISTER_SUCCESS, user: data.user })
                dispatch(setProgress(false));
                dispatch(redirectTo('/confirm'));
            })
            .catch((error) => { 
                dispatch({ type: REGISTER_ERROR, error: error})
                dispatch(setProgress(false));
            });
    }
}