import * as actionTypes from '../actions/actionTypes';
import updateObjectWithType from '../../utils/updateObjectWithGenreAndType';

const initialState = {
    style: "main",
    mode: "movie",
    searchedMovies: null,
    genres: null,
    page: null,
    totalPages: null,
    searchType: null,
    searchValue: null,
    initialMovies: null,
    initialSearch: [
        {value: "upcoming", displayValue: "Upcoming"},
        {value: "top_rated", displayValue: "Top Rated"}
        ],
    initialSearchMode: true,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_MODE:
            return {...state, mode: state.mode === "movie" ? "tv" : "movie"};
        case actionTypes.CHANGE_STYLE_DARK:
            return {...state, style: "dark"};
        case actionTypes.CHANGE_STYLE_LIGHT:
            return {...state, style: "light"};
        case actionTypes.GET_GENRES:
            return {...state, genres: action.payload.genres};
        case actionTypes.SEARCH_MOVIES_BY_INPUT_SUCCESS:
            return {
                ...state,
                searchedMovies: updateObjectWithType(action.payload.searchedMovies, state.mode, state.genres),
                page: action.payload.page,
                totalPages: action.payload.totalPages,
                searchType: "search"
            };

        case actionTypes.SEARCH_MOVIES_BY_SUBTYPE_SUCCESS:
            return {
                ...state,
                searchedMovies: updateObjectWithType(action.payload.searchedMovies, state.mode, state.genres),
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
            return {
                ...state,
                searchedMovies: updateObjectWithType(action.payload.searchedMovies, state.mode, state.genres),
                page: action.payload.page
            };
        case actionTypes.SEARCH_TYPE_RESET:
            return {...state, searchType: null, searchValue: null};
        case actionTypes.SET_MOVIES:
            return {
                ...state,
                initialMovies: action.payload.movies
            };
        case actionTypes.SEARCH_MODE_TOGGLE:
            return {...state, initialSearchMode: !state.initialSearchMode};
        case actionTypes.INITIAL_SEARCH:
            const initial = () => {
                if (state.mode === "movie") {
                    return state.initialSearchMode ? action.payload.movie.map(val => val).splice(0, 2) : action.payload.movie.map(val => val).splice(2, 2);
                } else {
                    return state.initialSearchMode ? action.payload.tv.map(val => val).splice(0, 2) : action.payload.tv.map(val => val).splice(2, 2);
                }
            };
            return {
                ...state,
                initialSearch: initial()
            };
        default:
            return state
    }
}