import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { stringify } from 'qs';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import client from '../../config';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.25,
    bacon: 0.5,
    cheese: 0.4,
    meat: 1
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
        purchasable: false,
        isBeingPurchased: false,
        ingredientsLoading: true,
        hasErrors: false

    };

    componentDidMount() {
        client.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
                this.updatePrice(response.data);
            })
            .catch(() => { this.setState({ hasErrors: true })})
            .finally(() => this.setState({ ingredientsLoading: false }));
    }

    updatePurchasableState = (ingredients) => {
        const ingredientCount = _.sum(_.values(ingredients));
        const purchasable = ingredientCount > 0;
        this.setState({ purchasable });
    };

    updatePrice(ingredients) {
        let totalPrice = 0;
        _.mapKeys(ingredients, ((v, k) => {
            totalPrice += INGREDIENT_PRICES[k]*v;
        }));
        this.setState({ totalPrice });
    }

    handleIngredient = (type, delta) => {
        const currentCount = this.state.ingredients[type];
        if (currentCount + delta >= 0) {
            let ingredients = {...this.state.ingredients};
            ingredients[type] = currentCount + delta;
            this.setState({ ingredients });
            this.updatePrice(ingredients);
            this.updatePurchasableState(ingredients);
        }
    };

    addIngredientHandler = (type) => {
        this.handleIngredient(type, 1);
    };

    removeIngredientHandler = (type) => {
        this.handleIngredient(type, -1);
    };

    orderNowHandler = () => {
        this.setState({ isBeingPurchased: true });
    };

    orderNowCancelHandler = () => {
        this.setState({ isBeingPurchased: false });
    };

    orderContinueHandler = () => {
        this.props.history.push({
            pathname: '/checkout',
            search: stringify({
                ingredients: this.state.ingredients,
                totalPrice: this.state.totalPrice
            }),
        });
    };

    render() {
        if (this.state.ingredientsLoading) {
            return <Spinner />;
        }

        const disabledInfo = {};
        for(let [ingredient, name] of Object.entries(this.state.ingredients)) {
            disabledInfo[name] = ingredient === 0;
        }

        const orderSummary = (
            <OrderSummary
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice}
                cancelHandler={this.orderNowCancelHandler}
                orderHandler={this.orderContinueHandler}
            />
        );
        const spinner = (<Spinner/>);
        const burgerBuilder = (
            <Fragment>
                <Modal show={this.state.isBeingPurchased} modalClosedHandler={this.orderNowCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    totalPrice={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    disabledInfo={disabledInfo}
                    addIngredientHandler={this.addIngredientHandler}
                    removeIngredientHandler={this.removeIngredientHandler}
                    orderNowHandler={this.orderNowHandler}
                />
            </Fragment>
        );

        return this.state.ingredientsLoading ? spinner :
            this.state.hasErrors ? null : burgerBuilder;
    }
}

export default withErrorHandler(BurgerBuilder, client);
