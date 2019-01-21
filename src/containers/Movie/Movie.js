import React, {Component} from 'react';
import axios from "../../axios/axiosOrders";
import {connect} from 'react-redux';
import {styleChangeDark, trailerInit} from "../../store/actions";
import updateObjectWithType from '../../utils/updateObjectWithType';

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
        this.props.styleChangeDark();
        const id = this.props.match.params.id;
        const type = this.props.match.params.type;
        axios.get(`/${type}/${id}?api_key=ea5e1bdf1c365782c88c209eca44f80f`)
            .then(res => {
                this.setState({item: res.data})
            });
        if (this.props.match.params.type === "person") {
            axios.get(`/${type}/${id}/movie_credits?api_key=ea5e1bdf1c365782c88c209eca44f80f`)
                .then(res => {
                    let movieItems = updateObjectWithType(res.data.cast, "movie");
                    axios.get(`/${type}/${id}/tv_credits?api_key=ea5e1bdf1c365782c88c209eca44f80f`)
                        .then(res => {
                            let tvItems = updateObjectWithType(res.data.cast, "tv");
                            const items = [...movieItems, ...tvItems];
                            this.setState({something: items, similar: []})
                        })
                })
        } else {
            axios.get(`/${type}/${id}/similar?api_key=ea5e1bdf1c365782c88c209eca44f80f`)
                .then(res => {
                    this.setState({similar: res.data.results})
                });
            axios.get(`/${type}/${id}/credits?api_key=ea5e1bdf1c365782c88c209eca44f80f`)
                .then(response => {
                    let items = updateObjectWithType(response.data.cast, "person");
                    this.setState({something: items})
                })
        }
    }

    componentDidUpdate(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            const id = this.props.match.params.id;
            const type = this.props.match.params.type;
            axios.get(`/${type}/${id}?api_key=ea5e1bdf1c365782c88c209eca44f80f`)
                .then(res => {
                    this.setState({item: res.data})
                });
            if (this.props.match.params.type === "person") {
                axios.get(`/${type}/${id}/movie_credits?api_key=ea5e1bdf1c365782c88c209eca44f80f`)
                    .then(res => {
                        this.setState({something: updateObjectWithType(res.data.cast, "movie"), similar: []})
                    })
            } else {
                axios.get(`/${type}/${id}/similar?api_key=ea5e1bdf1c365782c88c209eca44f80f`)
                    .then(res => {
                        this.setState({similar: res.data.results})

                    });
                axios.get(`/${type}/${id}/credits?api_key=ea5e1bdf1c365782c88c209eca44f80f`)
                    .then(response => {
                        let items = updateObjectWithType(response.data.cast, "person");
                        this.setState({something: items})
                    })
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
        if (this.state.similar && this.state.something && this.state.item) {
            if (this.props.match.params.type === "movie") {
                content = <MovieContent openTrailer={this.onTrailerHandler} item={this.state.item}/>
            }
            else if (this.props.match.params.type === "tv") {
                content = <TvContent openTrailer={this.onTrailerHandler} item={this.state.item}/>
            }
            else if (this.props.match.params.type === "person") {
                content = <PersonContent item={this.state.item}/>
            }
            data = (
                <React.Fragment>
                    <SideCard left movie={this.state.similar[Math.floor(Math.random() * this.state.similar.length)]}/>
                    <SideCard movie={this.state.similar[Math.floor(Math.random() * this.state.similar.length)]}/>
                    <div className={classes.Movie}>
                        <div className={classes.Movie__imageBox}>
                            <div></div>
                            <img
                                src={this.state.item.poster_path ? `https://image.tmdb.org/t/p/w500${this.state.item.poster_path}` : `https://image.tmdb.org/t/p/w500${this.state.item.profile_path}`}
                                alt={"Movie Poster"}/>
                            {this.state.item.homepage ? <h4>Visit Site: <a
                                href={this.state.item.homepage}>{this.state.item.title || this.state.item.name}</a>
                            </h4> : null}
                        </div>
                        <div className={classes.MovieContent}>
                            {content}
                        </div>
                    </div>
                </React.Fragment>
            )
            cast = <MovieList mode={this.props.mode} movies={this.state.something}/>
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
        showTrailer: state.trailer.show
    }
};

export default connect(mapStateToProps, { styleChangeDark, trailerInit })(Movie);
