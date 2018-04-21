import React, { Fragment } from 'react';

import classes from './Layout.css';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar';

const Layout = (props) => (
    <Fragment>
        <Toolbar></Toolbar>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Fragment>
);

export default Layout;