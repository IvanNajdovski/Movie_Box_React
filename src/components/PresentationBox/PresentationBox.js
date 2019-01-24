import React from 'react';
import classes from "./PresenationBox.module.scss"

import BigBox from './BoxBig/BoxBig';
import BoxSmall from './BoxSmall/BoxSmall';

const presentationBox = (props) => {
    let cssStyle = classes.PresentationBox
    if (props.reverse) {
        if(props.show === "exiting"){
            cssStyle = classes.PresentationBoxExited
        }else if(props.show === "entering"){
            cssStyle = classes.PresentationBox
        }
        return (
            <div className={cssStyle}>
                <div className={classes.PresentationInnerBox}>
                    <BoxSmall movies={props.movies[1]}/>
                    <BoxSmall movies={props.movies[2]}/>
                </div>
                <BigBox movie={props.movies[0]}/>
            </div>
        )
    }else{
    if(props.show === "exiting"){
            cssStyle = classes.PresentationBoxExitedReverse
        }
        return (
            <div className={cssStyle}>
                <BigBox movie={props.movies[0]}/>
                <div className={classes.PresentationInnerBox}>
                    <BoxSmall movies={props.movies[1]}/>
                    <BoxSmall movies={props.movies[2]}/>
                </div>
            </div>
        )
    }

}

export default presentationBox;