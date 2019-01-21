import { combineReducers } from 'redux';
import movieReducer from './movieReducer';
import trailerReducer from './trailerReducer';


export const rootReducer = combineReducers({
    movies: movieReducer,
    trailer: trailerReducer

});