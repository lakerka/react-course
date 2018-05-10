import _ from 'lodash';

import * as actionsTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 0,
    hasErrors: false,
    building: false,
};

const INGREDIENT_PRICES = {
    salad: 0.25,
    bacon: 0.5,
    cheese: 0.4,
    meat: 1
};


const burgerBuilderReducer = (state = initialState, action) => {
    const stateClone = _.cloneDeep(state);
    switch (action.type) {
        case actionsTypes.ADD_INGREDIENT:
            stateClone.ingredients[action.ingredientName] += 1;
            stateClone.totalPrice += INGREDIENT_PRICES[action.ingredientName];
            stateClone.building = true;
            return stateClone;
        case actionsTypes.REMOVE_INGREDIENT:
            if (stateClone.ingredients[action.ingredientName] > 0) {
                stateClone.ingredients[action.ingredientName] -= 1;
                stateClone.totalPrice -= INGREDIENT_PRICES[action.ingredientName];
                stateClone.building = true;
            }
            return stateClone;
        case actionsTypes.SET_INGREDIENTS:
            stateClone.ingredients = action.ingredients;
            stateClone.totalPrice = 0;
            for(const [ingredient, count] of Object.entries(action.ingredients)) {
                stateClone.totalPrice += INGREDIENT_PRICES[ingredient]*count;
            }
            stateClone.hasErrors = false;
            return stateClone;

        default:
            return state;
    }
};

export default burgerBuilderReducer;
