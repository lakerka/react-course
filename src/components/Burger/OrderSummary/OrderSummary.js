import React, { Fragment } from 'react';
import _ from 'lodash';

import ButtonComponent from '../../UI/Button/Button';

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
                <p><strong>Total price: {this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <ButtonComponent buttonType="Danger" clickHandler={this.props.cancelHandler}>Cancel</ButtonComponent>
                <ButtonComponent buttonType="Success" clickHandler={this.props.orderHandler}>Continue</ButtonComponent>
            </Fragment>
        );
    }
}

export default OrderSummary;
