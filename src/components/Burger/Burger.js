import React from 'react';
import _ from 'lodash';

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const Burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(key => {
            return [...Array(props.ingredients[key])]
                .map((_, i) => <BurgerIngredient key={key + i} type={key}/>)
        });
    transformedIngredients =  _.flatten(transformedIngredients);
    const ingredientsEmpty = transformedIngredients.length > 0;

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredientsEmpty ? transformedIngredients : 'Please select igredients!'}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default Burger;
