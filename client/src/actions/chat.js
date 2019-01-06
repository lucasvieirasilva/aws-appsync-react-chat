import {
    CHAT_CHANGE_MESSAGE,
    CHAT_SEND_MESSAGE
} from '../contants/actionTypes';
import { client } from '../aws/appsync';
import { CREATE_MESSAGE } from '../graphql/mutations';

export const setMessage = (value) => ({type: CHAT_CHANGE_MESSAGE, value });
export const sendMessage = (value) => {
    return dispatch => {
        client.mutate({
            mutation: CREATE_MESSAGE,
            variables: {
                body: value
            }
        }).then(() => {
            dispatch({ type: CHAT_SEND_MESSAGE })
        });
    }
}