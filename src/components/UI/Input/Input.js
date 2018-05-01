import React, { Component } from 'react';

import classes from './Input.css';


class Input extends Component {
    getClassName() {
        const classNames = [classes.InputElement];
        if (this.props.touched && this.props.valid === false) {
            classNames.push(classes.Invalid);
        }
        return classNames.join(' ');
    }

    render() {
        let element = null;
        const props = {
            ...this.props.inputConfig,
            onChange: this.props.onChange
        };
        const className = this.getClassName();

        switch (this.props.inputtype) {
            case ('input'):
                element = (<input
                    className={className}
                    {...props}
                />);
                break;
            case ('textarea'):
                element = (<textarea
                    className={className}
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
                        className={className}
                        {...props}
                    >
                        {options}
                    </select>
                );
                break;
            default:
                element = (<input
                    className={className}
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