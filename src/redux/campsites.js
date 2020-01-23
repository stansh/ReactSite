import { CAMPSITES } from '../shared/campsites';

export const Campsites = (state = CAMPSITES, action) => { //this a reducer
    switch (action.type) {
        default:
          return state;
      }
};

//Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but don't describe how the application's state changes.