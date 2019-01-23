import React from 'react';

import {FaYoutube, FaImdb} from "react-icons/fa";
import {IconContext} from "react-icons";
import RaitingAndPopularity from '../../UI/RaitingAndPopularity/RaitingAndPopularity';
import Compaies from '../../UI/Companies/Companies';

import classes from './TvContent.module.scss';

const tvContent = (props) => {
    const genres = props.item.genres.map(val => {
        return <li key={val.id}>{val.name}</li>
    })
    let nextEpisode = (
        <div>
            <h6>Coming Soon</h6>
        </div>
    );
    if (props.item.next_episode_to_air) {
        nextEpisode = (
            <div>
                <h6>Next Episode:
                    Season-{props.item.next_episode_to_air.season_number} Episode-{props.item.next_episode_to_air.episode_number}</h6>
                <h5>Title: {props.item.next_episode_to_air.name}</h5>
                <p>{props.item.next_episode_to_air.overview}</p>
            </div>
        )
    }
    const data = (
        <React.Fragment>
            <h1>{props.item.name} ({props.item.first_air_date.split("-")[0]})</h1>
            <p>{props.item.overview}</p>
            <ul>
                {genres}
            </ul>
            <p>Seasons Count: {props.item.number_of_seasons}</p>
            <p>Episode Count: {props.item.number_of_episodes}</p>
            <div className={classes.Content__Episodes}>
                <div>
                    <h6>Last Episode:
                        Season-{props.item.last_episode_to_air.season_number} Episode-{props.item.last_episode_to_air.episode_number}</h6>
                    <h5>Title: {props.item.last_episode_to_air.name}</h5>
                    <p>{props.item.last_episode_to_air.overview}</p>
                </div>
                {nextEpisode}
            </div>



            <RaitingAndPopularity vote={props.item.vote_average} count={props.item.vote_count}
                                  popularity={props.item.popularity}/>
            <div className={classes.Centered}>
                <div style={{flex: "1 1 50%", padding: "0 20px"}}>
                    <IconContext.Provider value={{size: "3em", color: "#c4302b", className: "global-class-name"}}>
                        <div className={classes.Content__Links}>
                            <h4>Watch Trailer</h4>
                            <FaYoutube className={classes.Trailer} onClick={props.openTrailer}/>
                        </div>
                    </IconContext.Provider>
                </div>
                <div style={{flex: "1 1 50%", padding: "0 20px"}}>
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


    return (
        <div className={classes.Content}>

            <h4>Created by: {props.item.created_by[0] ? props.item.created_by[0].name : "Unknown"}</h4>
            {data}

        </div>

    )
};

export default tvContent;