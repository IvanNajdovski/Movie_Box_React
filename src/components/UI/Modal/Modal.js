import React, { Component } from 'react';
import { connect } from 'react-redux';

class Modal extends Component {
    render(){
        return(
            <React.Fragment>
                <iframe title={"MovieTitle"} width="800" height="500" src={`https://www.youtube.com/embed/${this.props.trailerId}?autoplay=true`} frameBorder={"0"} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>

                </iframe>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) =>{
    return{
        trailerId: state.trailer.trailerId
    }
};

export default connect(mapStateToProps)(Modal);