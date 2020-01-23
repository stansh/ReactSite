import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

// this reducer adds new comment to Comments array; updates Comments portion of the state
export const Comments = (state = COMMENTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:  
            var comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            return state.concat(comment);
        default:
            return state;
      }
};

//Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but don't describe how the application's state changes.