import { ActionTypes } from '../contants/action-type';

export const Login = (data) => {
    return {
        type: ActionTypes.LOGIN,
        payload: data
    }
}

export const setUser = (data) => {
    return {
        type: ActionTypes.SET_USER,
        payload: data
    }
}