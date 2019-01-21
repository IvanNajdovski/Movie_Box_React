import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import classes from './SideCard.module.scss';
import ribon from '../../assets/Ribon.png';

import CircularProgressbar from 'react-circular-progressbar';


class SideCard extends Component {
    render() {
        if (!this.props.movie) {
            return null;
        } else {

            return (
                <Link to={`/${this.props.match.params.type}/${this.props.movie.id}`}
                      className={this.props.left ? classes.SideCard : classes.SideCardRight}
                      style={{backgroundImage: `linear-gradient( to left, rgba(0,0,0, 0.8) 0%, rgba(0,0,0, 0.2) 50%, rgba(0,0,0, 0.8) 90%), linear-gradient( to bottom, rgba(0,0,0, 0.5) 0%, rgba(0,0,0, 0.8) 50%, rgba(0,0,0, 1) 100%), url("https://image.tmdb.org/t/p/w500${this.props.movie.poster_path}")`}}>
                    {this.props.left ? <img alt={"ribon"} src={ribon} className={classes.Ribon}/> : null}
                    <h4>{this.props.movie.title || this.props.movie.name}</h4>
                    <h3>Raiting</h3>
                    <div style={{height: "30px", width: "30%"}}>
                        <CircularProgressbar
                            text={this.props.movie.vote_average * 10 + "%"}
                            percentage={this.props.movie.vote_average * 10}
                            initialAnimation
                            styles={{
                                path: {
                                    stroke: `#6e5514`,
                                    strokeLinecap: 'butt',

                                    transition: 'stroke-dashoffset 2s ease 0s',
                                },
                                trail: {
                                    // Trail color
                                    stroke: 'rgba(0,0,0, 0)',
                                },
                                text: {
                                    fill: '#6e5514',
                                    fontSize: '30px',
                                    fontFamily: "Cinzel"
                                },

                            }}
                        />
                    </div>

                </Link>
            )
        }

    }
}

export default withRouter(SideCard);