import React, { Component } from 'react';

import classes from './NavigationItem.css';

class NavigationItem extends Component {
    render() {
        return (
            <li className={classes.NavigationItem}>
                <a
                    className={this.props.active ? classes.active : null}
                    href={this.props.link}>{this.props.children}</a>
            </li>
        );
    }
}

export default NavigationItem;
