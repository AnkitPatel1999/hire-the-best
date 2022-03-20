import { ActionTypes } from '../contants/action-type';

export const Login = (data) => {
    return {
        type: ActionTypes.LOGIN,
        payload: data
    }
}

export const isAuthenticated = (data) => {
    return {
        type: ActionTypes.IS_AUTH,
        payload: data
    }
}