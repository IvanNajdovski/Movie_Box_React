import * as actionTypes from './actionTypes';
import axios from "../../axios/axiosOrders";

export const openTrailer = (trailer) => {
    return{
        type: actionTypes.TRAILER_OPEN,
        payload: {
            trailer
        }
    }
};

export const closeTrailer = () => {
    return{
        type: actionTypes.TRAILER_CLOSE
    }
};

export const trailerInit = (type, id) => {
    return (dispatch, getState) =>{
        axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=ea5e1bdf1c365782c88c209eca44f80f`)
            .then(res => {
                let trailer = res.data.results[Math.floor(Math.random(res.data.results.length))].key
                dispatch(openTrailer(trailer))
            })
    }
}