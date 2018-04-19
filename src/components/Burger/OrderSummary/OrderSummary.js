import React, { Fragment } from 'react';
import _ from 'lodash';

class OrderSummary extends React.Component {
    render() {
        const ingredientSummary = _.map(this.props.ingredients, (value, key) => (
            <li key={key}>
                <span style={{ 'textTransform': 'capitalize'}}>{key}</span>: {value}
            </li>
        ));
        return (
            <Fragment>
                <h3>Your Order</h3>
                <p>Burger with following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Continue to checkout?</p>
            </Fragment>
        );
    }
}

export default OrderSummary;
