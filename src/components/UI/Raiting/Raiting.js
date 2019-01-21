import React from 'react';
import classes from './Raiting.module.scss'
import raitingPic from '../../../assets/Raiting.png';
import empty from '../../../assets/Empty.png';
import Transition from 'react-transition-group/Transition';

const raiting = (props) => {
    let raiting = [];
    for(let i = 0; i < 5; i++){
        if(props.vote > i * 2){
            raiting.push("raiting")
        }else{
            raiting.push("empty")
        }
    }
    const raitingObject = raiting.map( (item, index) => {
        if(item === "raiting"){
            return(<div key={index} style={{flex: "0 0 12%"}}><img style={{width: "100%"}} src={raitingPic} alt={""}/></div>)
        }else{
            return(<div key={index} style={{flex: "0 0 12%"}}><img style={{width: "100%"}} src={empty} alt={""}/></div>)
        }
    })
    let raitingVote = <p>Raitng <span>{props.vote}</span> From <span>{props.count}</span> Users</p>
    if(props.raitingOnly){ raitingVote =  <p>Raitng <span>{props.vote}</span></p>}
    return(
        <div className={classes.Raiting__box}>
            {raitingVote}
            <div className={classes.Centered}>
                {raitingObject}
            </div>

        </div>
    )
};
export default raiting;