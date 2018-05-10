import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';


const asyncCheckout = asyncComponent(() => {
   return import('./containers/Checkout/Checkout');
});


const asyncOrders = asyncComponent(() => {
   return import('./containers/Orders/Orders');
});


const asyncAuth = asyncComponent(() => {
   return import('./containers/Auth/Auth');
});

class App extends Component {
    componentDidMount() {
        this.props.tryAutoSignIn();
    }

    render() {
        const { isAuthenticated, match, location } = this.props;
        const allowRedirect = match.url !== location.pathname;

        const unauthenticatedRoutes = (
            <Switch>
                <Route path="/auth" component={asyncAuth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
                { allowRedirect && <Redirect to="/" /> }
            </Switch>
        );

        const authenticatedRoutes = (
            <Switch>
                <Route path="/auth" component={asyncAuth} />
                <Route path="/logout" component={Logout} />
                <Route path="/checkout" component={asyncCheckout} />
                <Route path="/orders" component={asyncOrders} />
                <Route path="/" exact component={BurgerBuilder} />
                { allowRedirect && <Redirect to="/" /> }
            </Switch>
        );

        return (
            <div className="App">
                <Layout />
                    { isAuthenticated ? authenticatedRoutes : unauthenticatedRoutes }
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({
    isAuthenticated: auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
    tryAutoSignIn: () => dispatch(actions.tryAutoSignIn())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
