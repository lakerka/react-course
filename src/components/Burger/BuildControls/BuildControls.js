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
            </div>
        );
    }
}

export default BuildControls;
