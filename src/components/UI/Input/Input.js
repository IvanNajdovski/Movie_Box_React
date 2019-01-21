import React from 'react';
import {FiSearch} from "react-icons/fi";
import classes from './Input.module.scss'

const input = (props) => {
    return(
        <form onSubmit={props.onSubmit} className={classes.Form}>
            <label style={{color: "#898989"}}><FiSearch/></label>
            <input
                value={props.search}
                onChange={props.onChange}
                className={classes.Form__Input}
                type={"text"}
                name={"search"}
                placeholder={`Search ${props.mode === "movie" ? "Movies" : "Tv Shows"}`}/>
        </form>
    )
}
export default input;