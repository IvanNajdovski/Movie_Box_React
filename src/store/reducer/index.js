import { combineReducers } from 'redux';
import moviesReducer from './moviesReducer';
import trailerReducer from './trailerReducer';
import movieReducer from './movieReducer';

export const rootReducer = combineReducers({
    movies: moviesReducer,
    trailer: trailerReducer,
    movie: movieReducer

});