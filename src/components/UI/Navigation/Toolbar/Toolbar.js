import React, { Component } from 'react';

import classes from './Toolbar.css';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerOpen from '../SideDrawer/SideDrawerOpen/SideDrawerOpen';

class Toolbar extends Component {
    render() {
        return (
            <header className={classes.Toolbar}>
                <SideDrawerOpen sideDrawerOpenHandler={this.props.sideDrawerOpenHandler}/>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav className={classes.DesktopOnly}>
                    <NavigationItems isAuthenticated={this.props.isAuthenticated}/>
                </nav>
            </header>
        );
    }
}

export default Toolbar;