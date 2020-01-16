import { createStore } from 'redux';
import { Reducer, initialState } from './reducer';

export const ConfigureStore = () => {
    const store = createStore(   // this is a Redux function that creates a store which holds the state as an object tree
        Reducer,
        initialState
    );

    return store;
};