import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';


class App extends Component {
    componentDidMount() {
        this.props.tryAutoSignIn();
    }

    render() {
        const { isAuthenticated, match, location } = this.props;
        const allowRedirect = match.url !== location.pathname;

        const unauthenticatedRoutes = (
            <Switch>
                <Route path="/auth" component={Auth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
                { allowRedirect && <Redirect to="/" /> }
            </Switch>
        );

        const authenticatedRoutes = (
            <Switch>
                <Route path="/auth" component={Auth} />
                <Route path="/logout" component={Logout} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/orders" component={Orders} />
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
