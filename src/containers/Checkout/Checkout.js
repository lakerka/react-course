import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Contact from '../../components/Order/Contact/Contact';


class Checkout extends Component {
    checkoutCancelHandler = () => this.props.history.goBack();

    checkoutContinueHandler = () => this.props.history.push(this.props.match.path + '/contacts');

    render() {
        if (!this.props.ingredients || this.props.purchased) {
            return <Redirect to="/" />
        }

        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    cancelHandler={this.checkoutCancelHandler}
                    continueHandler={this.checkoutContinueHandler}
                />
                <Route
                    path={this.props.match.path + '/contacts'}
                    component={Contact}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ burgerBuilder, order }) => ({
    ingredients: burgerBuilder.ingredients,
    totalPrice: burgerBuilder.totalPrice,
    purchased: order.purchased,
});

export default connect(mapStateToProps)(Checkout);
