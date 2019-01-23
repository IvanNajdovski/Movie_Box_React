import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    resetSimilarMovies,
    styleChangeDark,
    resetData,
    trailerInit,
    setTypeAndId,
    getMovie,
    getSimilarMovies,
    getCredits,
    getCreditsForPerson
} from "../../store/actions";

import NetworkError from '../../components/ErrorPages/NetworkError/NetworkError';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Movie.module.scss';
import MovieList from "../../components/MovieList/MovieList";
import MovieContent from '../../components/Content/MovieContent/MovieContent';
import TvContent from '../../components/Content/TvContent/TvContent';
import PersonContent from '../../components/Content/PersonContent/PersonContent';
import SideCard from '../../components/SideCard/SideCard';
import Backdrop from '../../components/UI/BackDrop/BackDrop';
import Modal from '../../components/UI/Modal/Modal';


class Movie extends Component {
    state = {
        item: null,
        something: null,
        similar: null,
        tvCast: null
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        const type = this.props.match.params.type;
        this.props.getMovie(type, id);
        this.props.setTypeAndId(type, id);
        this.props.styleChangeDark();

        if (this.props.match.params.type === "person") {
            this.props.resetSimilarMovies();
            this.props.getCreditsForPerson(type, id)
        } else {
            this.props.getSimilarMovies(type, id);
            this.props.getCredits(type, id, "person")

        }
    }

    componentWillUpdate() {
        //this.props.resetData();
    }

    componentDidUpdate(nextProps) {

        if (this.props.match.params.id !== nextProps.match.params.id) {

            const id = this.props.match.params.id;
            const type = this.props.match.params.type;
            this.props.getMovie(type, id);
            if (this.props.match.params.type === "person") {
                this.props.resetSimilarMovies();
                this.props.getCredits(type, id, "movie")
            } else {
                this.props.getSimilarMovies(type, id);
                this.props.getCredits(type, id, "person")
            }
        }
    }

    onTrailerHandler = () => {
        this.props.trailerInit(this.props.match.params.type, this.props.match.params.id);

    };

    render() {
        let content = null;
        let cast = [];
        let data = null;
        if (this.props.movie) {
            if (this.props.movie.type === "movie") {
                content = <MovieContent openTrailer={this.onTrailerHandler} item={this.props.movie}/>
            }
            else if (this.props.movie.type === "tv") {
                content = <TvContent openTrailer={this.onTrailerHandler} item={this.props.movie}/>
            }
            else if (this.props.movie.type === "person") {
                content = <PersonContent item={this.props.movie}/>
            }
        }
        if(this.props.error){
            data = <NetworkError color={'#000'}/>
        }else if(this.props.loading){
            data = <Spinner color={"#6e5514"}/>
        } else if (this.props.similarMovies && this.props.credits && this.props.movie) {
            data = (
                <React.Fragment>
                    <SideCard left
                              movie={this.props.similarMovies[Math.floor(Math.random() * this.props.similarMovies.length)]}/>
                    <SideCard
                        movie={this.props.similarMovies[Math.floor(Math.random() * this.props.similarMovies.length)]}/>
                    <div className={classes.Movie}>
                        <div className={classes.Movie__imageBox}>
                            <div></div>
                            <img
                                src={this.props.movie.poster_path ? `https://image.tmdb.org/t/p/w500${this.props.movie.poster_path}` : `https://image.tmdb.org/t/p/w500${this.props.movie.profile_path}`}
                                alt={"Movie Poster"}/>
                            {this.props.movie.homepage ? <h4>Visit Site: <a
                                href={this.props.movie.homepage}>{this.props.movie.title || this.props.movie.name}</a>
                            </h4> : null}
                        </div>
                        <div className={classes.MovieContent}>
                            {content}
                        </div>
                    </div>
                </React.Fragment>
            );
            cast = <MovieList mode={this.props.mode} movies={this.props.credits}/>
        }

        return (
            <div style={{backgroundColor: "#000", position: "relative"}}>

                {this.props.showTrailer ? <Backdrop><Modal/></Backdrop> : null}
                {data}
                <h4>Featuring</h4>
                {cast}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        mode: state.movies.mode,
        showTrailer: state.trailer.show,
        movie: state.movie.movie,
        similarMovies: state.movie.similarMovies,
        credits: state.movie.credits,
        loading: state.movie.loading,
        error: state.movie.error,
    }
};

export default connect(mapStateToProps, {
    getCredits,
    styleChangeDark,
    trailerInit,
    setTypeAndId,
    getMovie,
    getSimilarMovies,
    getCreditsForPerson,
    resetData,
    resetSimilarMovies
})(Movie);
