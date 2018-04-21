import React, { Component } from 'react';

import classes from './Toolbar.css';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

class Toolbar extends Component {
    render() {
        return (
            <header className={classes.Toolbar}>
                <div onClick={this.props.sideDrawerOpenHandler}>
                    Menu
                </div>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav className={classes.DesktopOnly}>
                    <NavigationItems/>
                </nav>
            </header>
        );
    }
}

export default Toolbar;