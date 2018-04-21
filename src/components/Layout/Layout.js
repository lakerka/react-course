import React, { Component, Fragment } from 'react';

import classes from './Layout.css';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../UI/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        sideDrawerShow: false
    };

    sideDrawerOpenHandler = () => {
        this.setState({ sideDrawerShow: true });
    };

    sideDrawerCloseHandler = () => {
        this.setState({ sideDrawerShow: false });
    };

    render() {
        return (
            <Fragment>
                <Toolbar sideDrawerOpenHandler={this.sideDrawerOpenHandler}/>
                <SideDrawer
                    show={this.state.sideDrawerShow}
                    closeHandler={this.sideDrawerCloseHandler}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

export default Layout;
