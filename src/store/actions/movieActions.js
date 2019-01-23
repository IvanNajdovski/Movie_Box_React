import * as actionTypes from './actionTypes';
import axios from "../../axios/axiosOrders";
import updateObjectWithType from "../../utils/updateObjectWithType";

const setMovie = (data) => {
    console.log("[DATA]",data)
    return {
        type: actionTypes.SET_MOVIE,
        payload: {
            data
        }
    }
};
export const setTypeAndId = (type, id) => {
    return{
        type: actionTypes.SET_TYPE_AND_ID,
        payload: {
            type,
            id
        }
    }
};
export const getMovie = (type, id) => {
    return dispatch => {
        axios.get(`/${type}/${id}?api_key=ea5e1bdf1c365782c88c209eca44f80f`)
            .then(res => {
                dispatch(setMovie({...res.data, type}))
            });
    }
};
const setSimilarMovies = data => {
    return{
        type:actionTypes.SET_SIMILAR_MOVIES,
        payload: {
            data
        }
    }
};
export const getSimilarMovies = (type, id) => {
    return dispatch =>{
        axios.get(`/${type}/${id}/similar?api_key=ea5e1bdf1c365782c88c209eca44f80f`)
            .then(res => {
                const similarMovies = updateObjectWithType(res.data.results, type)
                console.log(res.data)
                dispatch(setSimilarMovies(similarMovies))
            });
    }
};
const setCredits = (data) => {
    return{
        type: actionTypes.SET_CREDITS,
        payload: {
            data
        }
    }
};
export const getCredits = (type, id, credit) => {
    console.log(credit)
    return dispatch => {
        axios.get(`/${type}/${id}/${credit !== "person" ? `${credit}_` : "" }credits?api_key=ea5e1bdf1c365782c88c209eca44f80f`)
            .then(response => {
                let items = updateObjectWithType(response.data.cast, credit);
                dispatch(setCredits(items))
            })
    }
};
export const getCreditsForPerson = (type,id) => {
    return dispatch => {
        axios.get(`/${type}/${id}/movie_credits?api_key=ea5e1bdf1c365782c88c209eca44f80f`)
            .then(res => {
                let movieItems = updateObjectWithType(res.data.cast, "movie");
                axios.get(`/${type}/${id}/tv_credits?api_key=ea5e1bdf1c365782c88c209eca44f80f`)
                    .then(res => {
                        let tvItems = updateObjectWithType(res.data.cast, "tv");
                        const items = [...movieItems, ...tvItems];
                        dispatch(setCredits(items))
                    })
            })
    }
};
export const resetData = () => {
    return{
        type: actionTypes.RESET_DATA
    }
};
export const resetSimilarMovies = () => {
    return{
        type: actionTypes.RESET_SIMILAR_MOVIES
    }
}