import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Navigation.css';

class Navigation extends Component {
    render() {
        return (
            <div className={classes.Navigation}>
                <NavLink to="/users">Users</NavLink>
                <NavLink to="/courses">Courses</NavLink>
            </div>
        );
    }
}

export default Navigation;
