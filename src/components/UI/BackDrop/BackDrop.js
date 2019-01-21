import React, { Component } from 'react';
import classes from './BackDrop.module.scss';
import { connect } from 'react-redux';
import { closeTrailer } from '../../../store/actions'

class Backdrop extends Component {
    render(){
        return(
            <div onClick={this.props.closeTrailer} className={classes.BackDrop}>
                {this.props.children}
            </div>
        )
    }
}

export default connect(null, { closeTrailer })(Backdrop);