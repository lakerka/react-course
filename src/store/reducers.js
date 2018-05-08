import _ from 'lodash';

import * as actionsTypes from './actionTypes';

const initialState = {
  ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
  },
  totalPrice: 0
};

const INGREDIENT_PRICES = {
    salad: 0.25,
    bacon: 0.5,
    cheese: 0.4,
    meat: 1
};


const reducer = (state = initialState, action) => {
    const stateClone = _.cloneDeep(state);
    switch (action.type) {
        case actionsTypes.ADD_INGREDIENT:
            stateClone.ingredients[action.ingredientName] += 1;
            stateClone.totalPrice += INGREDIENT_PRICES[action.ingredientName];
            return stateClone;
        case actionsTypes.REMOVE_INGREDIENT:
            if (stateClone.ingredients[action.ingredientName] > 0) {
                stateClone.ingredients[action.ingredientName] -= 1;
                stateClone.totalPrice -= INGREDIENT_PRICES[action.ingredientName];
            }
            return stateClone;
        default:
            return state;
    }
};

export default reducer;
