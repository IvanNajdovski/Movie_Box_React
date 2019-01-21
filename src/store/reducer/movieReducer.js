import * as actionTypes from '../actions/actionTypes';
import updateObjectWithType from '../../utils/updateObjectWithGenreAndType';

const initialState = {
    style: "main",
    mode: "movie",
    searchedMovies: null,
    page: null,
    totalPages: null,
    searchType: null,
    searchValue: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_MODE:
            return {...state, mode: state.mode === "movie" ? "tv" : "movie"};
        case actionTypes.CHANGE_STYLE_DARK:
            return {...state, style: "dark"};
        case actionTypes.CHANGE_STYLE_LIGHT:
            return {...state, style: "light"};
        case actionTypes.SEARCH_MOVIES_BY_INPUT_SUCCESS:
            return {
                ...state,
                searchedMovies: updateObjectWithType(action.payload.searchedMovies, state.mode),
                page: action.payload.page,
                totalPages: action.payload.totalPages,
                searchType: "search"
            };

        case actionTypes.SEARCH_MOVIES_BY_SUBTYPE_SUCCESS:
            return {
                ...state,
                searchedMovies: updateObjectWithType(action.payload.searchedMovies, state.mode),
                page: action.payload.page,
                totalPages: action.payload.totalPages,
                searchType: "subtype",
                searchValue: action.payload.value
            };
        case actionTypes.SEARCH_MOVIES_RESET:
            return {
                ...state,
                searchedMovies: null,
                page: null,
                totalPages: null,
                searchType: null,
                searchValue: null
            };
        case actionTypes.SEARCH_MOVIES_CHANGE_PAGE_SUCCESS:
            return{
                ...state,
                searchedMovies: updateObjectWithType(action.payload.searchedMovies, state.mode),
                page: action.payload.page
            };
        case actionTypes.SEARCH_TYPE_RESET:
            return{...state, searchType: null, searchValue: null};
        default:
            return state
    }
}