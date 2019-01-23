import React, {Component} from 'react';
import raitingPic from '../../../assets/Raiting.png';
import empty from '../../../assets/Empty.png';
import classes from './Raiting.module.scss'

class Raiting extends Component {
    state = {
        animate: false
    };
    animateFalse = () => {
        this.setState({animate: false})
    };
    animateTrue = () => {
        this.setState({animate: true})
    };

    render() {
        let raiting = [];
        for (let i = 0; i < 5; i++) {
            if (this.props.vote > i * 2) {
                raiting.push("raiting")
            } else {
                raiting.push("empty")
            }
        }
        const raitingObject = raiting.map((item, index) => {
            if (item === "raiting") {
                return (
                    <div
                        key={index}
                        className={this.state.animate ? classes.Animated : classes.Star}
                        style={{
                            flex: "0 0 12%",
                            animationDelay: index * 0.15 + 0.2 + "s"
                        }}><img style={{width: "100%"}} src={raitingPic} alt={""}/></div>
                )
            } else {
                return (
                    <div className={classes.Star} key={index} style={{flex: "0 0 12%"}}><img style={{width: "100%"}} src={empty} alt={""}/>
                    </div>)
            }
        });
        let raitingVote = <p>Raitng <span>{this.props.vote}</span> From <span>{this.props.count}</span> Users</p>
        if (this.props.raitingOnly) {
            raitingVote = <p>Raitng <span>{this.props.vote}</span></p>
        }
        return (
            <div className={classes.Raiting__box} onMouseLeave={this.animateFalse} onMouseEnter={this.animateTrue}>
                {raitingVote}
                <div className={classes.Centered}>
                    {raitingObject}
                </div>
            </div>
        )
    }
}

export default Raiting;