import React from 'react';
import classes from './PersonContent.module.scss';

const personContent = (props) => {
    const data = (
        <React.Fragment>
            <h1>{props.item.name}</h1>
            <h3>{props.item.gender === 1 ? "Female" : "Male" }</h3>
            <p>Biography: {props.item.biography ? props.item.biography : "Unknown"}</p>
            <p>Birth Date: {props.item.birthday} Place: {props.item.place_of_birth ? props.item.place_of_birth : "Unknown"}</p>
            <p>{props.item.deathday ? "Deceased " + props.item.deathday : null}</p>
        </React.Fragment>
    )
    return (
        <div className={classes.Content}>
            {data}
        </div>

    )
};

export default personContent;