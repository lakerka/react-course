import React, { Component } from 'react';

import classes from './SideDrawerOpen.css';

class SideDrawerOpen extends Component {
    render() {
        return (
            <div
                className={classes.SideDrawerOpen}
                onClick={this.props.sideDrawerOpenHandler}>
                <div />
                <div />
                <div />
            </div>

        );
    }
}

export default SideDrawerOpen;
