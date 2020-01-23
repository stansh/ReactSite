import { COMMENTS } from '../shared/comments';

export const Comments = (state = COMMENTS, action) => { //this a reducer
    switch (action.type) {
        default:
          return state;
      }
};

//Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but don't describe how the application's state changes.