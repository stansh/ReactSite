import * as ActionTypes from './ActionTypes';

export const Promotions = (state = { isLoading: true,
                                        errMess: null,
                                        promotions: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PROMOTIONS:
            return {...state, isLoading: false, errMess: null, promotions: action.payload};

        case ActionTypes.PROMOTIONS_LOADING:
            return {...state, isLoading: true, errMess: null, promotions: []}

        case ActionTypes.PROMOTIONS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
            
        default:
          return state;
      }
};
//Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but don't describe how the application's state changes.