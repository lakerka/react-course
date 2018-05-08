import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Contact from '../../components/Order/Contact/Contact';

class Checkout extends Component {
    checkoutCancelHandler = () => this.props.history.goBack();

    checkoutContinueHandler = () => this.props.history.push(this.props.match.path + '/contacts');

    render() {
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

const mapStateToProps = ({ ingredients, totalPrice  }) => ({ ingredients, totalPrice });

export default connect(mapStateToProps)(Checkout);
