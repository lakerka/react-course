import React, { Component } from 'react';

import classes from './Button.css';

class ButtonComponent extends Component {
    render() {
        return (
            <button
                className={[classes.Button, classes[this.props.buttonType]].join(' ')}
                disabled={this.props.disabled}
                onClick={this.props.clickHandler}>
                {this.props.children}
            </button>
        );
    }
}

export default ButtonComponent;
