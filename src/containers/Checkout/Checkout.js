import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import _ from 'lodash';
import { parse } from 'qs';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Contact from '../../components/Order/Contact/Contact';

class Checkout extends Component {
    constructor(props) {
        super(props);
        const params = parse(props.location.search, { ignoreQueryPrefix: true });
        let { ingredients } = params;
        ingredients = _.mapValues(ingredients, i => +i);
        this.state = { ingredients };
    }

    checkoutCancelHandler = () => this.props.history.goBack();

    checkoutContinueHandler = () => this.props.history.push(this.props.match.path + '/contacts');

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    cancelHandler={this.checkoutCancelHandler}
                    continueHandler={this.checkoutContinueHandler}
                />
                <Route path={this.props.match.path + '/contacts'} component={Contact} />
            </div>
        );
    }
}

export default Checkout;
