import React, { Component } from 'react';
import MovieCardSmall from "./MovieCardSmall/MovieCardSmall";

import Slider from 'react-slick';




class MovieList extends Component{
    render(){
        let settings = {
            autoplay: true,
            pauseOnHover: true,
            dots: this.props.type === "movie" ? true : false,
            arrows: false,
            infinite: true,
            speed: 500,
            autoplaySpeed: 2000,
            slidesToShow: this.props.movies.length <= 8 ? this.props.movies.length : 8,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: this.props.movies.length <= 6 ? this.props.movies.length : 6,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: this.props.movies.length <= 4 ? this.props.movies.length : 4,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: this.props.movies.length <= 2 ? this.props.movies.length : 2,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        const movies = this.props.movies.map(movie => {
            if(movie.profile_path || movie.poster_path){
                return(
                    <MovieCardSmall mode={this.props.mode} type={this.props.type} key={movie.id} movie={movie}/>
                )
            }else{return null}
        });
        return(

            <Slider {...settings} >
                {movies}
            </Slider>

        )
    }
}
export default MovieList;