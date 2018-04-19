import React from 'react';

import classes from './Modal.css';


class Modal extends React.Component {
    render() {
        return (
            <div className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    visibility: this.props.show ? 'visible' : 'hidden'
                }}
            >
                {this.props.children}
            </div>
        );
    }
}


export default Modal;