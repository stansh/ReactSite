// import { PARTNERS } from '../shared/partners';
import * as ActionTypes from './ActionTypes';

/* export const Partners = (state = PARTNERS */
    // isLoading: true,
    // errMess: null,
    // partners: []
    
  /*   ,action) => { //this a reducer
        switch (action.type) {
            default:
            return state;
        }
    }; */

//Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but don't describe how the application's state changes.

export const Partners = (state = { 
    isLoading: true,
    errMess: null,
    partners: [] }, action) => {
        switch (action.type) {
            case ActionTypes.ADD_PARTNERS:
                return {...state, isLoading: false, errMess: null, partners: action.payload};

            case ActionTypes.PARTNERS_LOADING:
                return {...state, isLoading: true, errMess: null, partners: []}

            case ActionTypes.PARTNERS_FAILED:
                return {...state, isLoading: false, errMess: action.payload};

            default:
            return state;
        }
        };