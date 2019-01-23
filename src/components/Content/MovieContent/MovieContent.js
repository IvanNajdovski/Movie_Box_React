import React from 'react';
import {FaYoutube, FaImdb} from "react-icons/fa";
import {IconContext} from "react-icons";
import classes from './MovieContent.module.scss';
import RaitingAndPopularity from '../../UI/RaitingAndPopularity/RaitingAndPopularity';
import Compaies from '../../UI/Companies/Companies';


const movieContent = (props) => {

    let data = null
    if (props.item.poster_path){


        const genres = props.item.genres.map(val => {
            return <li key={val.id}>{val.name}</li>
        });
         data = (
            <React.Fragment>
                <h1>{props.item.title} ({props.item.release_date.split("-")[0]})</h1>
                <p>{props.item.overview}</p>
                <ul>
                    {genres}
                </ul>
                <p>Budget: {props.item.budget} $</p>
                <p>Revinue: {props.item.revenue} $</p>
                <p>Run Time: {props.item.runtime} min</p>

                <RaitingAndPopularity vote={props.item.vote_average} count={props.item.vote_count} popularity={props.item.popularity}/>
                <div className={classes.Centered}>
                    <div style={{flex: "1 1 50%",padding: "0 20px"}}>
                        <IconContext.Provider value={{size: "3em", color: "#c4302b", className: "global-class-name"}}>
                            <div className={classes.Content__Links}>
                                <h4>Watch Trailer</h4>
                                <FaYoutube className={classes.Trailer} onClick={props.openTrailer}/>
                            </div>
                        </IconContext.Provider>
                    </div>
                    <div style={{flex: "1 1 50%",padding: "0 20px"}}>
                        <IconContext.Provider value={{size: "3em", color: "#DBA505", className: "global-class-name"}}>
                            <div className={classes.Content__Links}>
                                <h4>Visit on IMDB</h4>
                                <a href={`https://www.imdb.com/title/${props.item.imdb_id}`}>
                                    <FaImdb/>
                                </a>

                            </div>
                        </IconContext.Provider>
                    </div>
                </div>
                <h4>Production companies</h4>
                <Compaies companies={props.item.production_companies}/>
            </React.Fragment>
        )
    }
    return (
        <div className={classes.Content}>
            {data}
        </div>
    )
};

export default movieContent;