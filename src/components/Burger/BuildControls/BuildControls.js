import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'},
];

class BuildControls extends React.Component {
    render() {
        return (
            <div className={classes.BuildControls}>
                <p>Total price: <strong>{this.props.totalPrice.toFixed(2)}</strong></p>
                {
                    controls.map((control, i) =>
                        <BuildControl
                            lessDisabled={this.props.disabledInfo[control.type]}
                            key={control.label + i}
                            type={control.type}
                            label={control.label}
                            addIngredientHandler={this.props.addIngredientHandler}
                            removeIngredientHandler={this.props.removeIngredientHandler}
                        />)
                }
                <button className={classes.OrderButton}
                        disabled={!this.props.purchasable}
                        onClick={this.props.orderNowHandler}
                >
                    Order now
                </button>
            </div>
        );
    }
}

export default BuildControls;
