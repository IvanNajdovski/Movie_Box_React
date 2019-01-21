import React, {Component} from 'react';
import classes from './MainContent.module.css';
import axios from "../../axios/axiosOrders";
import {connect} from 'react-redux';
import {styleChangeLight} from '../../store/actions';

import Transition from 'react-transition-group/Transition';

import PresentationBox from '../../components/PresentationBox/PresentationBox';
import MovieList from '../../components/MovieList/MovieList';
import updateObject from '../../utils/updateObjectWithGenreAndType';
import updateObjectWithGender from '../../utils/updateObjectWithGenreAndType';
import MovieSearchList from '../../components/MovieSearchList/MovieSearchList';
import PageSearch from '../../components/UI/PageSearch/PageSearch';
import Input from '../../components/UI/Input/Input';
import InputWrapper from '../../components/UI/InputWrapper/InputWrapper';

const MOVIE_SUBVALUES = [
    {value: "upcoming", displayValue: "Upcoming"},
    {value: "now_playing", displayValue: "In Cinemas"},
    {value: "latest", displayValue: "Latest"},
    {value: "popular", displayValue: "Most Popular"},
    {value: "top_rated", displayValue: "Top Rated"},
];
const TV_SUBVALUES = [
    {value: "airing_today", displayValue: "Coming Out Today"},
    {value: "on_the_air", displayValue: "Now Showing"},
    {value: "latest", displayValue: "Latest"},
    {value: "popular", displayValue: "Most Popular"},
    {value: "top_rated", displayValue: "Top Rated"},
];

class MainContent extends Component {
    state = {
        mode: "main",
        popular: [],
        nowPlaying: [],
        genders: [],
        search: "",
        searchedMovies: null,
        page: null,
        totalPages: null,
        searchType: null,
        searchValue: null


    };

    componentDidMount() {
        this.props.styleChangeLight();
        axios.get(`/genre/${this.props.mode}/list?api_key=ea5e1bdf1c365782c88c209eca44f80f`)
            .then(res => {
                localStorage.setItem('genders', JSON.stringify(res.data.genres))
            });
        axios.get(`/${this.props.mode}/top_rated?api_key=ea5e1bdf1c365782c88c209eca44f80f`)
            .then(res => {
                this.setState({popular: updateObject(res.data.results, this.props.mode)})
            });
        axios.get(`/${this.props.mode}/popular?api_key=ea5e1bdf1c365782c88c209eca44f80f`)
            .then(res => {
                this.setState({nowPlaying: updateObject(res.data.results, this.props.mode)})

            });
    }

    componentDidUpdate(nextProps) {
        if (this.props.mode !== nextProps.mode) {
            this.setState({searchedMovies: null})
            axios.get(`/${this.props.mode}/top_rated?api_key=ea5e1bdf1c365782c88c209eca44f80f`)
                .then(res => {
                    this.setState({popular: updateObject(res.data.results, this.props.mode)})
                });
            axios.get(`/${this.props.mode}/popular?api_key=ea5e1bdf1c365782c88c209eca44f80f`)
                .then(res => {
                    this.setState({nowPlaying: updateObject(res.data.results, this.props.mode)})
                });
        }
    }
    onChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };
    onSubmitHandler = (e) => {
        e.preventDefault();
        axios.get(`/search/${this.props.mode}?api_key=ea5e1bdf1c365782c88c209eca44f80f&query=${this.state.search}`)
            .then(res => {
                this.setState({
                    searchedMovies: updateObjectWithGender(res.data.results, this.props.mode),
                    page: res.data.page,
                    totalPages: res.data.total_pages,
                    searchType: "search"
                });
                console.log("[RESULTS ARE]", res.data)

            })
    };
    onSubmodeChangeHandler = (value) => {
        axios.get(`/${this.props.mode}/${value}?api_key=ea5e1bdf1c365782c88c209eca44f80f`)
            .then(res => {
                this.setState({
                    searchedMovies: updateObjectWithGender(res.data.results, this.props.mode),
                    page: res.data.page,
                    totalPages: res.data.total_pages,
                    searchType: "submode",
                    searchValue: value
                });

            })
    };
    onPageChangeHandler = (val) => {
        if (this.state.searchType === 'submode') {
            axios.get(`/${this.props.mode}/${this.state.searchValue}?api_key=ea5e1bdf1c365782c88c209eca44f80f&page=${val}`)
                .then(res => {
                    this.setState({
                        searchedMovies: updateObjectWithGender(res.data.results, this.props.mode),
                        page: res.data.page
                    });

                })
        } else {
            axios.get(`/search/${this.props.mode}?api_key=ea5e1bdf1c365782c88c209eca44f80f&query=${this.state.search}&page=${val}`)
                .then(res => {
                    this.setState({
                        searchedMovies: updateObjectWithGender(res.data.results, this.props.mode),
                        page: res.data.page,
                        searchType: "null"
                    });
                })
        }
    };
    render() {
        const navigation = this.props.mode === "movie" ? MOVIE_SUBVALUES : TV_SUBVALUES;
        const itemsSubmode = navigation.map((item, index) => {
            return (
                <li key={index} className={classes.SubmodeItems}
                    onClick={() => this.onSubmodeChangeHandler(item.value)}>{item.displayValue}</li>
            )
        });
        let movies = null;
        if (this.state.searchedMovies) {
            movies = <MovieSearchList movies={this.state.searchedMovies}/>
        }
        let presentationBox = <div></div>
        if (this.state.popular[3] && this.state.nowPlaying[3]) {
            presentationBox = (
                <React.Fragment>
                    <Transition
                        unmountOnExit
                        mountOnEnter
                        in={!this.state.searchedMovies ? true : false}
                        timeout={1000}>
                        {state => {
                            console.log(state)
                            return (
                                <PresentationBox
                                    show={state}
                                    movies={[...this.state.popular].splice(0, 3)}
                                />
                            )
                        }}
                    </Transition>
                    <Transition
                        unmountOnExit
                        mountOnEnter
                        in={!this.state.searchedMovies ? true : false}
                        timeout={1000}>
                        {state => (
                            <PresentationBox
                                show={state}
                                reverse
                                movies={[...this.state.nowPlaying].splice(0, 3)}
                            />
                        )}
                    </Transition>
                </React.Fragment>
            )
        }
        return (
            <React.Fragment>

                <MovieList
                    mode={this.props.mode}
                    type={this.props.style}
                    movies={this.state.nowPlaying}/>
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
                    {this.state.totalPages ? <PageSearch page={this.state.page} total_pages={this.state.totalPages}
                                                         pageChange={this.onPageChangeHandler}/> : null}
                    <Transition
                        unmountOnExit
                        mountOnEnter
                        in={!this.state.searchedMovies ? true : false}
                        timeout={1000}>
                        {state => (
                            <React.Fragment>
                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <h2>Top Rated</h2>
                                    <h2>In Cinemas</h2>
                                </div>
                                <div className={classes.MainContent}>
                                    {presentationBox}
                                </div>
                            </React.Fragment>
                        )}
                    </Transition>
                </div>
                {movies}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        mode: state.movies.mode,
        style: state.movies.style
    }
};
export default connect(mapStateToProps, {styleChangeLight})(MainContent);
