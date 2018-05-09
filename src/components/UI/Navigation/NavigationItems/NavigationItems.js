import React, { Component } from 'react';


import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

class NavigationItems extends Component {
    render() {
        const logout = <NavigationItem link="/logout">Logout</NavigationItem>;
        const authenticate = <NavigationItem link="/auth">Authenticate</NavigationItem>;
        return (
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/">Burger Builder</NavigationItem>
                <NavigationItem link="/orders">Orders</NavigationItem>
                {
                    this.props.isAuthenticated ? logout : authenticate
                }
            </ul>
        );
    }
}

export default NavigationItems;
