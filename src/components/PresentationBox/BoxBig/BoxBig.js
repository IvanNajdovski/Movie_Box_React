import React from 'react';
import classes from './BoxBig.module.css';

import { Link } from 'react-router-dom';

const BigBox = (props) => {
    const { backdrop_path, poster_path, title, overview} = props.movie;
    return(
        <Link to={`/${props.movie.type}/${props.movie.id}`} className={classes.BoxBig} style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${backdrop_path})`}}>
            <div className={classes.BoxBigInner}>
                <img alt={"Cover"} src={`https://image.tmdb.org/t/p/w500${poster_path}`}/>
                <div style={{padding: "10px"}}>
                    <h3>{title}</h3>
                    <p>{overview}</p>
                </div>

            </div>
        </Link>
    )
}
export default  BigBox;


