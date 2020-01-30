import * as ActionTypes from './ActionTypes';  // * - imports all exports (ActionTypes) from specified file
import { baseUrl } from '../shared/baseUrl';

// the action (action creator) of adding a comment
// export const addComment = (campsiteId, rating, author, text) => ({
//     type: ActionTypes.ADD_COMMENT,
//     payload: {
//         campsiteId: campsiteId,
//         rating: rating,
//         author: author,
//         text: text
//     }
// });

export const fetchCampsites = () => dispatch => { // arrow function inside an arrow function (redux-thunk enables that)
    dispatch(campsitesLoading()); //dispatches  campsitesLoading action

    return fetch(baseUrl + 'campsites') // location of  the resource
    .then(response => {
            if (response.ok) { // true if HTTP response status cose is within 200 - 299
                 return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);  // bad response from server  
                error.response = response;
                throw error;
            }
        },
        error => { // no response from server at all
            const errMess = new Error(error.message);
            throw errMess;
        }
    )
    .then(response => response.json()) // converts data to JS
    .then(campsites => dispatch(addCampsites(campsites)))
    .catch(error => dispatch(campsitesFailed(error.message)));
};

export const campsitesLoading = () => ({ //dispatched from fetchCampsites function; 
    type: ActionTypes.CAMPSITES_LOADING
});

export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});

//fetching comments

export const fetchComments = () => dispatch => {    
    return fetch(baseUrl + 'comments')
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);        
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMess = new Error(error.message);
            throw errMess;
        }
    )
    .then(response => response.json()) // array of comments received/fetched
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};


export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

//posting a comment to the server

export const postComment = (campsiteId, rating, author, text) => dispatch => {
    
    const newComment = {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
            method: "POST", //by default the HTTP request method is "GET"
            body: JSON.stringify(newComment),
            headers: {
                "Content-Type": "application/json" // so the server knows that the body will be formated as JSON
            }
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => { throw error; }
        )
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {
            console.log('post comment', error.message);
            alert('Your comment could not be posted\nError: ' + error.message);
        });
};

//fetching promotions

export const fetchPromotions = () => (dispatch) => {
    
    dispatch(promotionsLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)));
};

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});

export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});

export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});


// fetch partners
export const fetchPartners = () => (dispatch) => {

dispatch(partnersLoading());

return fetch(baseUrl + 'partners')
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);        
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMess = new Error(error.message);
            throw errMess;
        }
    )
    .then(response => response.json()) // array of comments received/fetched
    .then(partners => dispatch(addPartners(partners)))
    .catch(error => dispatch(partnersFailed(error.message)));
};

export const partnersLoading = () => ({
    type: ActionTypes.PARTNERS_LOADING
});

export const partnersFailed = errMess => ({
    type: ActionTypes.PARTNERS_FAILED,
    payload: errMess
});

export const addPartners = partners => ({
    type: ActionTypes.ADD_PARTNERS,
    payload: partners
});


//posting feedback

export const postFeedback = (campsiteId,firstName,lastName,telnum,email,agree,contactType,message) => dispatch => {
    
    const newFeedback = {
        campsiteId: campsiteId,
        firstName: firstName,
        lastName: lastName,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message
        
        

    };

    newFeedback.date = new Date().toISOString();

    return fetch(baseUrl + 'feedback', {
            method: "POST",
            body: JSON.stringify(newFeedback),
            headers: {
                "Content-Type": "application/json" // so the server knows that the body will be formated as JSON
            }
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => { throw error; }
        )
        // .then(response => response.json())
        // .then(response => dispatch())
        .then(response => dispatch (
            alert('Thank you for your feedback! ' + JSON.stringify(newFeedback))
             ))

        .catch(error => {
            console.log('post feedback', error.message);
            alert('Your feedback could not be posted\nError: ' + error.message);
        })
}
