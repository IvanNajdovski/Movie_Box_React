import * as actionTypes from './actionTypes';

export const modeChange = () => {
    return{
        type: actionTypes.CHANGE_MODE
    }
};
export const  styleChangeDark = () => {
    return{
        type: actionTypes.CHANGE_STYLE_DARK
    }
};
export const  styleChangeLight = () => {
    return{
        type: actionTypes.CHANGE_STYLE_LIGHT
    }
};
export const SearchMoviesByInputSuccess = (data, page, total_pages) => {
    return{
        type: actionTypes.SEARCH_MOVIES_BY_INPUT_SUCCESS,
        payload: {
            searchedMovies: data,
            page,
            totalPages: total_pages
        }
    }
}