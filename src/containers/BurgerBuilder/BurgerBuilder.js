import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import client from '../../config';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actionTypes';


class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        isBeingPurchased: false,
        ingredientsLoading: true,
        hasErrors: false

    };

    componentDidMount() {
        client.get('/ingredients.json')
            .then(response => {
                // this.setState({ ingredients: response.data });
                // this.updatePrice(response.data);
            })
            .catch(() => { this.setState({ hasErrors: true })})
            .finally(() => this.setState({ ingredientsLoading: false }));
    }

    isPurchasable = () => {
        const ingredientCount = _.sum(_.values(this.props.ingredients));
        return ingredientCount > 0;
    };

    orderNowHandler = () => {
        this.setState({ isBeingPurchased: true });
    };

    orderNowCancelHandler = () => {
        this.setState({ isBeingPurchased: false });
    };

    orderContinueHandler = () => {
        this.props.history.push('/checkout');
    };

    render() {
        if (this.props.ingredientsLoading) {
            return <Spinner />;
        }

        const disabledInfo = {};
        for(let [ingredient, name] of Object.entries(this.props.ingredients)) {
            disabledInfo[name] = ingredient === 0;
        }

        const orderSummary = (
            <OrderSummary
                ingredients={this.props.ingredients}
                totalPrice={this.props.totalPrice}
                cancelHandler={this.orderNowCancelHandler}
                orderHandler={this.orderContinueHandler}
            />
        );
        const spinner = (<Spinner/>);
        const burgerBuilder = (
            <Fragment>
                <Modal show={this.state.isBeingPurchased} modalClosedHandler={this.orderNowCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls
                    totalPrice={this.props.totalPrice}
                    purchasable={this.isPurchasable()}
                    disabledInfo={disabledInfo}
                    addIngredientHandler={this.props.addIngredientHandler}
                    removeIngredientHandler={this.props.removeIngredientHandler}
                    orderNowHandler={this.orderNowHandler}
                />
            </Fragment>
        );

        return this.props.ingredientsLoading ? spinner :
            this.state.hasErrors ? null : burgerBuilder;
    }
}

const mapStateToProps = ({ ingredients, totalPrice  }) => ({ ingredients, totalPrice });

const mapDispathToProps = (dispatch) => {
    return {
        addIngredientHandler: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
        removeIngredientHandler: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName })
    };
};


export default connect(mapStateToProps, mapDispathToProps)(withErrorHandler(BurgerBuilder, client));
