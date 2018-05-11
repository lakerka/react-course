import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import client from '../../config';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { orderBurgerInit } from '../../store/actions';


export class BurgerBuilder extends Component {
    state = {
        isBeingPurchased: false,
    };

    componentDidMount() {
        this.props.initIngredients();
    }

    isPurchasable = () => {
        const ingredientCount = _.sum(_.values(this.props.ingredients));
        return ingredientCount > 0;
    };

    orderNowHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ isBeingPurchased: true });
        } else {
            this.props.history.push('/auth');
        }
    };

    orderNowCancelHandler = () => {
        this.setState({ isBeingPurchased: false });
    };

    orderContinueHandler = () => {
        this.props.orderBurgerInit();
        this.props.history.push('/checkout');
    };

    render() {
        if (this.props.hasErrors) {
            return null;
        }
        if (!this.props.ingredients) {
            return <Spinner />;
        }


        const disabledInfo = {};
        for(const [name, count] of Object.entries(this.props.ingredients)) {
            disabledInfo[name] = count === 0;
        }

        const orderSummary = (
            <OrderSummary
                ingredients={this.props.ingredients}
                totalPrice={this.props.totalPrice}
                cancelHandler={this.orderNowCancelHandler}
                orderHandler={this.orderContinueHandler}
            />
        );
        return (
            <Fragment>
                <Modal show={this.state.isBeingPurchased} modalClosedHandler={this.orderNowCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls
                    isAuthenticated={this.props.isAuthenticated}
                    totalPrice={this.props.totalPrice}
                    purchasable={this.isPurchasable()}
                    disabledInfo={disabledInfo}
                    addIngredientHandler={this.props.addIngredientHandler}
                    removeIngredientHandler={this.props.removeIngredientHandler}
                    orderNowHandler={this.orderNowHandler}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = ({ burgerBuilder, auth }) => ({
    ingredients: burgerBuilder.ingredients,
    totalPrice: burgerBuilder.totalPrice,
    hasErrors: burgerBuilder.hasErrors,
    isAuthenticated: auth.isAuthenticated
});

const mapDispathToProps = (dispatch) => {
    return {
        initIngredients: () => dispatch(actions.initIngredients()),
        addIngredientHandler: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        removeIngredientHandler: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        orderBurgerInit: () => dispatch(orderBurgerInit()),
    };
};

export default connect(mapStateToProps, mapDispathToProps)(withErrorHandler(BurgerBuilder, client));
