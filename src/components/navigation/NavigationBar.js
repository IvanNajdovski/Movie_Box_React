import React , { Component } from 'react';
import classes from './navigationBar.module.css';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { modeChange } from '../../store/actions'


import NavigationItems from './NavigationItems/NavigationItems'

class NavigationBar extends Component{
    render(){
        return(
            <header className={classes.NavigationContainer}>
                <div>
                    Logo
                </div>

                <nav  className={classes.NavigationNav}>
                    <button onClick={() => this.props.history.push("/")}>
                        Home
                    </button>

                    <button onClick={this.props.modeChange}>
                        TV Shows
                    </button>
                    <NavigationItems>
                        Movies
                    </NavigationItems>
                </nav>
            </header>
        )
    }
}
export default connect(null,{modeChange})(withRouter(NavigationBar));