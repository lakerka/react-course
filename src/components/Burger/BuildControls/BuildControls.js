import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'Salad'},
    { label: 'Bacon', type: 'Bacon'},
    { label: 'Cheese', type: 'Cheese'},
    { label: 'Meat', type: 'Meat'},
];

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            {
                controls.map((control, i) => <BuildControl key={control.label + i} label={control.label} />)
            }
        </div>
    );
};

export default BuildControls;
