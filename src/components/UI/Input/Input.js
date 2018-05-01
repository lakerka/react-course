import React, { Component } from 'react';

import classes from './Input.css';


class Input extends Component {
    render() {
        let element = null;
        const props = {
            ...this.props.inputConfig,
            onChange: this.props.onChange
        };
        switch (this.props.inputtype) {
            case ('input'):
                element = (<input
                    className={classes.InputElement}
                    {...props}
                />);
                break;
            case ('textarea'):
                element = (<textarea
                    className={classes.InputElement}
                    {...props}
                />);
                break;
            case ('select'):
                const options = this.props.inputConfig.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ));
                element = (
                    <select
                        className={classes.InputElement}
                        {...props}
                    >
                        {options}
                    </select>
                );
                break;
            default:
                element = (<input
                    className={classes.InputElement}
                    {...props}
                    />);
                break;
        }

        return (
            <div className={classes.Input}>
                <label className={classes.Label}>{this.props.label}</label>
                {element}
            </div>
        );
    }
}

export default Input;