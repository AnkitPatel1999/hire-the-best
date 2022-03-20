import { ActionTypes } from '../contants/action-type';

const initialState = {
    user:null
}

export const userReducers = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.LOGIN:
            return {...state,user:payload};
        case ActionTypes.SET_USER:
            return {...state,user:payload};
        default:
            return state;
    }
}