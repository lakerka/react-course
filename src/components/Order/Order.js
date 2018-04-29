import React, { Component } from 'react';

import classes from './Order.css'

class Order extends Component {
    render() {
        const ingredients = Object.entries(this.props.ingredients)
            .map(([key, value]) =>
                <span
                    key={key}
                    className={classes.Ingredient}
                >
                    {key} ({value})
                </span>
            );

        return (
            <div className={classes.Order}>
                <p>Ingredients: {ingredients}</p>
                <p>Price: <strong>USD {this.props.price.toFixed(2)}</strong></p>
            </div>
        );
    }
}

export default Order;