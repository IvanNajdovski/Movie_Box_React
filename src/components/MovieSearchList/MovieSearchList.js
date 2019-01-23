import React from 'react';

import MovieSearchCard from './MovieSearchCard/MovieSearchCard';

const movieSearchList = (props) => {
    const movies = props.movies.map(movie => {
        if(movie.poster_path){
            return (
                <MovieSearchCard key={movie.id} movie={movie}/>
            )
        }else{
            return null;
        }
    });
    return (
        <div>
            {movies}
        </div>
    )
};
export default movieSearchList;