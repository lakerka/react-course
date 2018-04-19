import React, { Component } from 'react';

import classes from './Button.css';

class ButtonComponent extends Component {
    render() {
        return (
            <button
                className={[classes.Button, classes[this.props.buttonType]].join(' ')}
                onClick={this.props.clickHandler}>
                {this.props.children}
            </button>
        );
    }
}

export default ButtonComponent;
