import React, { Component } from 'react';

import classes from './Backdrop.css'

class Backdrop extends Component {
    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <div className={classes.Backdrop} onClick={this.props.clickHandler} />
        );
    }
}

export default Backdrop;
