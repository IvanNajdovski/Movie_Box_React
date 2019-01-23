import React from 'react';
import Loader from 'react-loader-spinner';
import classes from './Spinner.module.scss';

const spinner = (props) => {
    return(
        <div style={{backgroundColor: `${props.bgColor}`}} className={classes.Spinner}>
            <Loader type="Triangle" color={`${props.color}`} height={200} width={200} />
            <h3 style={{color: `${props.color}`}}>Movie Box</h3>
        </div>
    )
};
export default spinner;