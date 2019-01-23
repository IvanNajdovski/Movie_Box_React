import React, {Component} from 'react';
import classes from './MainContent.module.css';
import {connect} from 'react-redux';
import {
    styleChangeLight,
    searchMoviesByInput,
    searchMoviesBySubtype,
    searchTypeReset,
    searchMoviesChangePage,
    getGenresInit,
    getMoviesInit,
    searchMoviesReset,
    searchModeToggle,
    initialSearchType
} from '../../store/actions';

import Spinner from '../../components/UI/Spinner/Spinner';
import Transition from 'react-transition-group/Transition';
import Input from '../../components/UI/Input/Input';
import InputWrapper from '../../components/UI/InputWrapper/InputWrapper';
import PresentationBox from '../../components/PresentationBox/PresentationBox';
import MovieList from '../../components/MovieList/MovieList';
import MovieSearchList from '../../components/MovieSearchList/MovieSearchList';
import PageSearch from '../../components/UI/PageSearch/PageSearch';
import NetworkError from '../../components/ErrorPages/NetworkError/NetworkError'


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

class MainContent extends Component {
    state = {
        search: "",
    };


    componentDidMount() {
        this.props.styleChangeLight();
        this.props.getGenresInit();
        this.props.getMoviesInit(this.props.initialSearch.map(val => val.value))
    }

    componentDidUpdate(nextProps) {
        if (this.props.mode !== nextProps.mode || this.props.initialSearchMode !== nextProps.initialSearchMode) {

            this.props.searchMoviesReset();
            this.props.getMoviesInit(this.props.initialSearch.map(val => val.value))
        }
    }

    onChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };
    onSubmitHandler = (e) => {
        e.preventDefault();
        this.props.searchMoviesByInput(this.state.search);
    };
    onSubmodeChangeHandler = (value) => {
        this.props.searchMoviesBySubtype(value);
    };
    onPageChangeHandler = (val) => {
        this.props.searchMoviesChangePage(this.props.searchType, val, this.state.search);
    };

    render() {
        const navigation = this.props.mode === "movie" ? MOVIE_SUBVALUES : TV_SUBVALUES;
        const itemsSubmode = navigation.map((item, index) => {
            return (
                <button disabled={item.value === this.props.searchValue} key={index} className={classes.SubmodeItems}
                        onClick={() => this.onSubmodeChangeHandler(item.value)}>{item.displayValue}</button>
            )
        });
        let movies = null;
        if (this.props.searchedMovies) {
            movies = <MovieSearchList movies={this.props.searchedMovies}/>
        }
        let presentationBox = this.props.loading ? <Spinner color={"#000"}/> : <div></div>

        let initialMovies = null;
        let values = null
        if (this.props.initialMovies) {
            values =(
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <h2>{this.props.initialSearch[0].displayValue}</h2>
                    <h2>{this.props.initialSearch[1].displayValue}</h2>
                </div>
            )
            initialMovies = (<MovieList
                mode={this.props.mode}
                type={this.props.style}
                movies={this.props.initialMovies[0]}/>)
            presentationBox = (
                <React.Fragment>
                    <Transition
                        unmountOnExit
                        mountOnEnter
                        in={!this.props.searchedMovies ? true : false}
                        timeout={1000}>
                        {state => {

                            return (
                                <PresentationBox
                                    show={state}
                                    movies={[...this.props.initialMovies[0]].splice(0, 3)}
                                />
                            )
                        }}
                    </Transition>
                    <Transition
                        unmountOnExit
                        mountOnEnter
                        in={!this.props.searchedMovies ? true : false}
                        timeout={1000}>
                        {state => (
                            <PresentationBox
                                show={state}
                                reverse
                                movies={[...this.props.initialMovies[1]].splice(0, 3)}
                            />
                        )}
                    </Transition>
                </React.Fragment>
            )
        }else if (this.props.error){
            presentationBox = <NetworkError/>
        }
        return (

            <React.Fragment>
                {initialMovies}
                <InputWrapper>
                    <ul className={classes.SubmodeList}>
                        {itemsSubmode}
                    </ul>
                    <Input
                        onChange={this.onChangeHandler}
                        onSubmit={this.onSubmitHandler}
                        mode={this.props.mode}
                    />
                </InputWrapper>
                <div className={classes.MainContentWrapper}>
                    {this.props.totalPages ? <PageSearch page={this.props.page} total_pages={this.props.totalPages}
                                                         pageChange={this.onPageChangeHandler}/> : null}
                    <Transition
                        unmountOnExit
                        mountOnEnter
                        in={!this.props.searchedMovies ? true : false}
                        timeout={1000}>
                        {state => (
                            <React.Fragment>
                                {values}
                                <div className={classes.MainContent}>
                                    {presentationBox}
                                </div>
                            </React.Fragment>
                        )}
                    </Transition>
                </div>
                {movies}
                {this.props.totalPages ? <PageSearch page={this.props.page} total_pages={this.props.totalPages}
                                                     pageChange={this.onPageChangeHandler}/> : null}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        initialSearch: state.movies.initialSearch,
        mode: state.movies.mode,
        style: state.movies.style,
        genres: state.movies.genres,
        searchedMovies: state.movies.searchedMovies,
        page: state.movies.page,
        totalPages: state.movies.totalPages,
        searchType: state.movies.searchType,
        searchValue: state.movies.searchValue,
        initialMovies: state.movies.initialMovies,
        initialSearchMode: state.movies.initialSearchMode,
        loading: state.movies.loading,
        error: state.movies.error


    }
};
export default connect(mapStateToProps, {
    searchTypeReset,
    styleChangeLight,
    searchMoviesBySubtype,
    searchMoviesByInput,
    searchMoviesChangePage,
    getGenresInit,
    getMoviesInit,
    searchMoviesReset,
    searchModeToggle,
    initialSearchType
})(MainContent);
