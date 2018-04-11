import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


const INGREDIENT_PRICES = {
    salad: 0.25,
    bacon: 0.5,
    cheese: 0.4,
    meat: 1
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
        },
        totalPrice: 2
    };

    addIngredientHandler = (type) => {
        const currentCount = this.state.ingredients[type];
        let ingredients = { ...this.state.ingredients };
        ingredients[type] = currentCount + 1;
        const totalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({ ingredients, totalPrice });
    };

    removeIngredientHandler = (type) => {
        const currentCount = this.state.ingredients[type];
        if (currentCount > 0) {
            let ingredients = { ...this.state.ingredients };
            ingredients[type] = currentCount - 1;
            const totalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({ ingredients, totalPrice });
        }
    };

    render() {
        const disabledInfo = {};
        for(let key in this.state.ingredients) {
            disabledInfo[key] = this.state.ingredients[key] === 0;
        }

        return (
            <Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    disabledInfo={disabledInfo}
                    addIngredientHandler={this.addIngredientHandler}
                    removeIngredientHandler={this.removeIngredientHandler}
                />
            </Fragment>
        );
    }
}

export default BurgerBuilder;
