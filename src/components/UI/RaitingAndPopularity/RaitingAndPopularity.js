import React from "react";
import classes from './RaitingAndPopularity.module.scss';
import poplarity from '../../../assets/popularity.png';
import Raiting from '../Raiting/Raiting';

const raitingAndPopularit = (props) => {


    return(
        <div className={classes.Raiting}>
           <Raiting vote={props.vote} count={props.count}/>
            <div className={classes.Production}>
                <div style={{flex: "0 0 20%"}}>
                    <img style={{width: "100%"}} src={poplarity} alt={""}/>
                </div>
                <div>
                    <p>Popularity <span>{props.popularity}</span></p>
                </div>
            </div>
        </div>
    )
};
export default raitingAndPopularit;