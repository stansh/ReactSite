//the state of the App is moved here; in Redux reducers create and update state

import { CAMPSITES } from '../shared/campsites';
import { COMMENTS } from '../shared/comments';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';



export const initialState = { /* the data from the source files is stored in this object instead of the Main component */
    campsites: CAMPSITES,
    comments: COMMENTS,
    partners: PARTNERS,
    promotions: PROMOTIONS
};

export const Reducer = (state = initialState, action) => {  // if no state passed in the state get set to the initialState object above; default function parameter is used.
    return state;
};

