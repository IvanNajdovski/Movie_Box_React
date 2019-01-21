import React , { Component } from 'react';
import classes from './navigationBar.module.css';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { modeChange, searchMoviesReset } from '../../store/actions'


import NavigationItems from './NavigationItems/NavigationItems'

class NavigationBar extends Component{
    onModeChangeHandler = () => {
        this.props.modeChange();
        this.props.searchMoviesReset();
    }
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

                    <button onClick={this.onModeChangeHandler}>
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
export default connect(null,{modeChange, searchMoviesReset})(withRouter(NavigationBar));