import React, { Component } from 'react';

import classes from './Spinner.css';

class Spinner extends Component {
    render() {
        return (
            <div className={classes.Spinner}>{this.props.children}</div>
        );
    }
}

export default Spinner;
