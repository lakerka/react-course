import React, { Component, Fragment } from 'react';
import _ from 'lodash';


import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
    salad: 0.25,
    bacon: 0.5,
    cheese: 0.4,
    meat: 1
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 0,
        purchasable: false,
        isBeingPurchased: false

    };

    updatePurchasableState = (ingredients) => {
        const ingredientCount = _.sum(_.values(ingredients));
        const purchasable = ingredientCount > 0;
        this.setState({ purchasable });
    };

    handleIngredient = (type, delta) => {
        const currentCount = this.state.ingredients[type];
        if (currentCount + delta >= 0) {
            let ingredients = {...this.state.ingredients};
            ingredients[type] = currentCount + delta;
            const totalPrice = this.state.totalPrice + delta * INGREDIENT_PRICES[type];
            this.setState({ ingredients, totalPrice });
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

    render() {
        const disabledInfo = {};
        for(let key in this.state.ingredients) {
            disabledInfo[key] = this.state.ingredients[key] === 0;
        }

        return (
            <Fragment>
                <Modal show={this.state.isBeingPurchased}>
                    <OrderSummary ingredients={this.state.ingredients}/>
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
    }
}

export default BurgerBuilder;
