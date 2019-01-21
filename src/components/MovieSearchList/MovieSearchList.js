import React from 'react';

import MovieSearchCard from './MovieSearchCard/MovieSearchCard';

const movieSearchList = (props) => {
    const movies = props.movies.map(movie => {
        return (

                <MovieSearchCard movie={movie}/>

        )
    });
    return (
        <div>
            {movies}
        </div>
    )
};
export default movieSearchList;