import React, {Component} from 'react';
import classes from './navigationBar.module.css';
import {withRouter} from 'react-router-dom';
import navPic from '../../assets/Nav.jpg';
import {connect} from 'react-redux';
import {
    modeChange,
    searchMoviesReset,
    initialSearchType,
    searchModeToggle
} from '../../store/actions';
import Logo from '../../assets/Logo.png';

const MOVIE_SUBVALUES = [
    {value: "upcoming", displayValue: "Upcoming"},
    {value: "top_rated", displayValue: "Top Rated"},
    {value: "now_playing", displayValue: "In Cinemas"},
    {value: "popular", displayValue: "Most Popular"},
];
const TV_SUBVALUES = [
    {value: "top_rated", displayValue: "Top Rated"},
    {value: "airing_today", displayValue: "Coming Out Today"},
    {value: "on_the_air", displayValue: "Now Showing"},
    {value: "popular", displayValue: "Most Popular"},
];

class NavigationBar extends Component {
    state = {
        nextSubValues: [
            {value: "now_playing", displayValue: "In Cinemas"},
            {value: "popular", displayValue: "Most Popular"}]
    }

    componentDidUpdate(nextProps) {
        if (this.props.mode !== nextProps.mode || this.props.initialSearchMode !== nextProps.initialSearchMode) {
            const initial = () => {
                if (this.props.mode === "movie") {
                    return this.props.initialSearchMode ? MOVIE_SUBVALUES.map(val => val).splice(2, 2) : MOVIE_SUBVALUES.map(val => val).splice(0, 2);
                } else {
                    return this.props.initialSearchMode ? TV_SUBVALUES.map(val => val).splice(2, 2) : TV_SUBVALUES.map(val => val).splice(0, 2);
                }
            }
            this.setState({nextSubValues: initial()})
        }
    }

    onChangeModeHandler = () => {
        this.props.searchModeToggle();
        this.props.initialSearchType(MOVIE_SUBVALUES, TV_SUBVALUES)
        this.props.history.push("/")
    };

    onModeChangeHandler = () => {
        this.props.modeChange();
        this.props.initialSearchType(MOVIE_SUBVALUES, TV_SUBVALUES);
        this.props.searchMoviesReset();
        this.props.history.push("/")
    };

    render() {

        return (
            <header
                className={classes.NavigationContainer}
                style={this.props.style === 'light' ? {backgroundImage: `linear-gradient( to bottom, rgba(0,0,0,.8) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,.8)100%), url("${navPic}")`} : {backgroundImage: `linear-gradient( to bottom, rgba(0,0,0, 1) 0%, rgba(0,0,0,.7) 50%, rgba(0,0,0,1)100%), url("${navPic}")`}}>
                <div className={classes.NavigationLogo__box} onClick={() => this.props.history.push("/")}>
                    <img alt={"logo"} src={Logo} className={classes.NavigationLogo__img}/>
                </div>

                <nav className={classes.NavigationNav}>
                    <button className={this.props.style === 'light' ? classes.Toggle : classes.ToggleDark} onClick={this.onChangeModeHandler}>
                        {this.state.nextSubValues[0].displayValue}/{this.state.nextSubValues[1].displayValue}
                    </button>
                    <button className={this.props.style === 'light' ? classes.Toggle : classes.ToggleDark} onClick={this.onModeChangeHandler}>
                        {this.props.mode === "tv" ? "Get Movies" : "Get Tv Shows"}
                    </button>
                </nav>
            </header>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mode: state.movies.mode,
        initialSearchMode: state.movies.initialSearchMode,
        style: state.movies.style
    }
};
export default connect(mapStateToProps, {
    modeChange,
    searchMoviesReset,
    initialSearchType,
    searchModeToggle
})(withRouter(NavigationBar));