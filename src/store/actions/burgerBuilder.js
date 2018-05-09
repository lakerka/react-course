import * as actionTypes from './actionTypes';
import client from '../../config';


export const addIngredient = ingredientName => {
    return { type: actionTypes.ADD_INGREDIENT, ingredientName };
};

export const removeIngredient = ingredientName => {
    return { type: actionTypes.REMOVE_INGREDIENT, ingredientName };
};

export const setIngredient = ingredients => {
    return { type: actionTypes.SET_INGREDIENTS, ingredients };
};

export const setHasErrors = hasErrors => {
    return { type: actionTypes.SET_HAS_ERRORS, hasErrors};
};

export const initIngredients = () => {
    return dispatch => {
        client.get('/ingredients.json')
            .then(response => {
                dispatch(setIngredient(response.data))
            })
            .catch(() => { dispatch(setHasErrors(true)); });
    };
};
