import React, { Component } from 'react';

import classes from './CheckoutSummary.css';
import Burger from '../../Burger/Burger';
import ButtonComponent from '../../UI/Button/Button';


class CheckoutSummary extends Component {
    render() {
        return (
            <div className={classes.CheckoutSummary}>
                <h1>Checkout</h1>
                <div className={classes.BurgerContainer}>
                    <Burger ingredients={this.props.ingredients} />
                </div>
                <ButtonComponent buttonType="Danger" clickHandler={this.props.cancelHandler}>Cancel</ButtonComponent>
                <ButtonComponent buttonType="Success" clickHandler={this.props.continueHandler}>Continue</ButtonComponent>
            </div>
        );
    }
}

export default CheckoutSummary;
