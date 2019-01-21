import React from 'react';
import classes from './InputWrapper.module.scss'

const inputWrapper = (props) => {
    return(
        <div className={classes.InputWrapper}>
            {props.children}
        </div>
    )
};
export default inputWrapper;