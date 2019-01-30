import * as actionTypes from './actionTypes';
import axios from "../../axios/axiosOrders";
import updateObject from "../../utils/updateObjectWithGenreAndType";

export const modeChange = () => {
    return {
        type: actionTypes.CHANGE_MODE
    }
};
export const styleChangeDark = () => {
    return {
        type: actionTypes.CHANGE_STYLE_DARK
    }
};
export const styleChangeLight = () => {
    return {
        type: actionTypes.CHANGE_STYLE_LIGHT
    }
};
const setMovies = (movies) => {
    return {
        type: actionTypes.SET_MOVIES,
        payload: {
            movies
        }
    }

};
const loadingTrue = () => {
    return {
        type: actionTypes.LOADING_TRUE
    }
};
const loadingFalse = () => {
    return {
        type: actionTypes.LOADING_FALSE
    }
};
const errorTrue = () => {
    return {
        type: actionTypes.ERROR_TRUE
    }
};
const errorFalse = () => {
    return {
        type: actionTypes.ERROR_FALSE
    }
};
export const searchModeToggle = () => {
    return {
        type: actionTypes.SEARCH_MODE_TOGGLE
    }
};
export const initialSearchType = (movie, tv) => {

    return {
        type: actionTypes.INITIAL_SEARCH,
        payload: {
            movie,
            tv
        }
    }
};

export const getMoviesInit = (type) => {

    return (dispatch, getState) => {
        dispatch(errorFalse());
        dispatch(loadingTrue());
        let movies = [];

        axios.get(`/${getState().movies.mode}/${type[0]}?api_key=ea5e1bdf1c365782c88c209eca44f80f`)
            .then(res => {

                movies.push(updateObject(res.data.results, getState().movies.mode, getState().movies.genres))
                axios.get(`/${getState().movies.mode}/${type[1]}?api_key=ea5e1bdf1c365782c88c209eca44f80f`)
                    .then(res => {
                        movies.push(updateObject(res.data.results, getState().movies.mode, getState().movies.genres))
                        dispatch(setMovies(movies));
                        dispatch(loadingFalse());
                    })
                    .catch(err => {
                        dispatch(errorTrue())
                    })
            })
            .catch(err => {
                dispatch(errorTrue())
            })
       

    }
};
const getGenres = (data) => {
    return {
        type: actionTypes.GET_GENRES,
        payload: {
            genres: data
        }
    }
};
export const getGenresInit = () => {

    return (dispatch, getState) => {
        //dispatch(loadingTrue());
        axios.get(`/genre/${getState().movies.mode}/list?api_key=ea5e1bdf1c365782c88c209eca44f80f`)
            .then(res => {
                dispatch(getGenres(res.data.genres))
                localStorage.setItem('genders', JSON.stringify(res.data.genres))
                //dispatch(loadingFalse());
            });
    }
}
const searchMoviesByInputSuccess = (data, page, total_pages) => {
    return {
        type: actionTypes.SEARCH_MOVIES_BY_INPUT_SUCCESS,
        payload: {
            searchedMovies: data,
            page,
            totalPages: total_pages
        }
    }
};
export const searchMoviesByInput = (input) => {
    return (dispatch, getState) => {

        dispatch(errorFalse());
        axios.get(`/search/${getState().movies.mode}?api_key=ea5e1bdf1c365782c88c209eca44f80f&query=${input}`)
            .then(res => {
                dispatch(searchMoviesByInputSuccess(res.data.results, res.data.page, res.data.total_pages));

            })
            .catch(err => {
                dispatch(errorTrue());
            })
    }
};
export const searchMoviesBySubtypeSuccess = (data, page, total_pages, value) => {
    return {
        type: actionTypes.SEARCH_MOVIES_BY_SUBTYPE_SUCCESS,
        payload: {
            searchedMovies: data,
            page,
            totalPages: total_pages,
            value
        }
    }
};
export const searchMoviesBySubtype = (val) => {
    return (dispatch, getState) => {
        //dispatch(loadingTrue());
        dispatch(errorFalse());
        axios.get(`${getState().movies.mode}/${val}?api_key=ea5e1bdf1c365782c88c209eca44f80f`)
            .then(res => {
                dispatch(searchMoviesBySubtypeSuccess(res.data.results, res.data.page, res.data.total_pages, val));
                //dispatch(loadingFalse());
            })
            .catch(err => {
                dispatch(errorTrue());
            })
    }
};
export const searchMoviesReset = () => {
    return {
        type: actionTypes.SEARCH_MOVIES_RESET
    }
};
export const searchTypeReset = () => {
    return {
        type: actionTypes.SEARCH_TYPE_RESET
    }
};
const searchMoviesChangePageSuccess = (data, page) => {
    return {
        type: actionTypes.SEARCH_MOVIES_CHANGE_PAGE_SUCCESS,
        payload: {
            searchedMovies: data,
            page
        }
    }
};
export const searchMoviesChangePage = (type, val, input) => {
    if (type === "subtype") {
        return (dispatch, getState) => {
            dispatch(errorFalse());
            //dispatch(loadingTrue());
            axios.get(`/${getState().movies.mode}/${getState().movies.searchValue}?api_key=ea5e1bdf1c365782c88c209eca44f80f&page=${val}`)
                .then(res => {
                    dispatch(searchMoviesChangePageSuccess(res.data.results, res.data.page));
                    //dispatch(loadingFalse());
                })
                .catch(err => {
                    dispatch(errorTrue());
                })
        }
    } else {
        return (dispatch, getState) => {
            dispatch(errorFalse());
            //dispatch(loadingTrue());
            axios.get(`/search/${getState().movies.mode}?api_key=ea5e1bdf1c365782c88c209eca44f80f&query=${input}&page=${val}`)
                .then(res => {
                    dispatch(searchMoviesChangePageSuccess(res.data.results, res.data.page));
                    dispatch(searchTypeReset())
                    //dispatch(loadingFalse());
                })
                .catch(err => {
                    dispatch(errorTrue());
                })
        }
    }
};
