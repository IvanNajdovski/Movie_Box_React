
import React, { Component } from 'react';
import { Line, Circle } from 'rc-progress';

class ProgressBar extends Component {
    render() {
        return (
            <div style={{ margin: 10, width: 50 }}>
                <Circle percent='60' strokeWidth="10" strokeColor={this.props.color}>What</Circle>
            </div>
        );
    }
}
export default ProgressBar;