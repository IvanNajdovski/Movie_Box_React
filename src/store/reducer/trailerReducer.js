import * as actionTypes from '../actions/actionTypes';

const initialState = {
    trailerId: null,
    show: false
};

export default ( state = initialState , action) => {
    switch(action.type){
        case actionTypes.TRAILER_OPEN:
            return{...state, show:true, trailerId: action.payload.trailer};
        case actionTypes.TRAILER_CLOSE:
            return{...state, show:false};
        default:
            return state;
    }
};