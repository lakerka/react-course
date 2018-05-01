import React from 'react';

import classes from './CounterOutput.css';

const counterOutput = (props) => (
    <div className={classes.CounterOutput}>
        Current Counter: {props.value}
    </div>
);

export default counterOutput;