import * as actionTypes from '../actions/actionTypes';

const initialState = {
    type: "",
    id:"",
    movie: null,
    similarMovies: null,
    credits: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TYPE_AND_ID:
            return{...state, type: action.payload.type, id: action.payload.id};
        case actionTypes.SET_MOVIE:
            return{...state, movie: action.payload.data};
        case actionTypes.SET_SIMILAR_MOVIES:
            return{...state, similarMovies: action.payload.data};
        case actionTypes.SET_CREDITS:
            return{...state, credits: action.payload.data};
        case actionTypes.RESET_DATA:
            return{...state, movie: null, similarMovies: null, credits: null};
        case actionTypes.RESET_SIMILAR_MOVIES:
            return{...state, similarMovies: []};
        default:
            return state
    }
}