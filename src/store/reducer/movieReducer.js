import * as actionTypes from '../actions/actionTypes';
import updateObjectWithType from '../../utils/updateObjectWithGenreAndType';

const initialState = {
    style: "main",
    mode: "movie",
    movies: [],
    searchedMovies: null,
    page: null,
    totalPages: null,
    searchType: null,
    searchValue: null
}

export default ( state = initialState, action) => {
    switch(action.type){
        case actionTypes.CHANGE_MODE:
            return{...state, mode: state.mode === "movie" ? "tv" : "movie"};
        case actionTypes.CHANGE_STYLE_DARK:
            return{...state, style: "dark"};
        case actionTypes.CHANGE_STYLE_LIGHT:
            return{...state, style: "light"};
        case actionTypes.SEARCH_MOVIES_BY_INPUT_SUCCESS:{
            return{...state,
                searchedMovies: updateObjectWithType(action.payload.searchedMovies),
                page: action.payload.page,
                totalPages: action.payload.totalPages}
        }
        default:
            return state
    }
}