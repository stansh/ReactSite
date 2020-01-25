/* import { CAMPSITES } from '../shared/campsites'; */
import * as ActionTypes from './ActionTypes';

export const Campsites = (state = { //a reducer function has two parameters: state and action
    isLoading: true,
    errMess: null,
    campsites: []
}, action) => {
switch (action.type) {
    case ActionTypes.ADD_CAMPSITES:
        return {...state, isLoading: false, errMess: null, campsites: action.payload};
    case ActionTypes.CAMPSITES_LOADING:
        return {...state, isLoading: true, errMess: null, campsites: []};
    case ActionTypes.CAMPSITES_FAILED:
        return {...state, isLoading: false, errMess: action.payload};
    default:
        return state;
}
};

//Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but don't describe how the application's state changes.