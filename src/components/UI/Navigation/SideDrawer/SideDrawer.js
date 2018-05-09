import React, { Component, Fragment } from 'react';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './SideDrawer.css';
import Backdrop from '../../Backdrop/Backdrop';

class SideDrawer extends Component {
    render() {
        let dynamicClasses = [classes.SideDrawer, classes.Close];
        if (this.props.show) {
            dynamicClasses = [classes.SideDrawer, classes.Open]
        }

        return (
            <Fragment>
                <Backdrop
                    show={this.props.show}
                    clickHandler={this.props.closeHandler}
                />
                <div className={dynamicClasses.join(' ')}>
                    <div className={classes.Logo}>
                        <Logo/>
                    </div>
                    <nav>
                        <NavigationItems isAuthenticated={this.props.isAuthenticated} />
                    </nav>
                </div>
            </Fragment>
        );
    }
}

export default SideDrawer;
