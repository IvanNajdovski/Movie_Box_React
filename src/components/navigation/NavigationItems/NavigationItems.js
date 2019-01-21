import React from 'react';
import classes from './NavigationItems.module.css';


const navigationItems = (props) => {
        return(
            <div  className={classes.NavigationItems}>
                {props.children}
            </div>
        )
};
export default navigationItems;