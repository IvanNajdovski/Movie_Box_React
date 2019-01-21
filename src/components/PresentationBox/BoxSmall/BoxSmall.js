import React from 'react';
import { Link } from "react-router-dom";
import classes from './BoxSmall.module.scss';

const boxSmall = (props) => {
    const { title, overview , backdrop_path} = props.movies;
    return(
        <Link to={`/${props.movies.type}/${props.movies.id}`} className={classes.BoxSmall} style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${backdrop_path})`}}>
            <div>
                <h3>{title}</h3>
                <p>{overview}</p>
            </div>
        </Link>
    )
};
export default  boxSmall







