import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import classes from './MovieSearchCard.module.scss';
import Raiting from '../../UI/Raiting/Raiting';

class MovieSearchCard extends Component {
    state = {
        hover: false
    }
    onHoverEnterHandler = () => {
        this.setState({hover: true})
    }
    onHoverLeaveHandler = () => {
        this.setState({hover: false})
    }
    render() {

        const {poster_path, type, id, original_title, vote_average , vote_count, release_date, genre, original_name, first_air_date} = this.props.movie;
        return (
            <Link to={`/${type}/${id}`} className={classes.MovieSearchCard}>
                <div className={classes.MovieSearchCard__Content}>
                    <h3>{original_title || original_name } ({release_date ? release_date.split("-")[0] : null}{first_air_date ? first_air_date.split("-")[0] : null})</h3>
                    <p>{genre}</p>
                    <div style={{width: "150px"}}>
                        <Raiting raitingOnly vote={vote_average} count={vote_count}/>
                    </div>

                </div>
                <div className={classes.MovieSearchCard__box}>
                    <div
                        className={this.state.hover ? [classes.MovieSearchCard__PosterLeft, classes.MovieSearchCard__hovered].join(" ") : classes.MovieSearchCard__PosterLeft}
                        onMouseEnter={this.onHoverEnterHandler}
                        onMouseLeave={this.onHoverLeaveHandler}
                        style={{backgroundImage: `url("https://image.tmdb.org/t/p/w500${poster_path}")`}}
                    >

                    </div>
                </div>

            </Link>
        )
    }
}

export default MovieSearchCard;