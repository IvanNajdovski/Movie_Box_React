import React from 'react';
import classes from './MovieCardSmall.module.scss';

import { Link } from 'react-router-dom';

const MovieCardSmall = (props) => {
    const {title, genre, poster_path, name, character, profile_path, type} = props.movie;

    return (
        <Link to={`/${type}/${props.movie.id}`} className={props.type === "light" ? classes.MovieCardMovies : classes.MovieCardCast}>
            <div className={classes.MovieCardImageWrapper}>
                <img src={`https://image.tmdb.org/t/p/w500${ profile_path || poster_path}`} alt={"Cover"}/>
            </div>
            <h5>{title || name }</h5>
            <p>{genre || character }</p>
        </Link>
    )

};
export default MovieCardSmall;