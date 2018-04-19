import React, { Component, Fragment } from 'react';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component {
    render() {
        return (
            <Fragment>
                <Backdrop show={this.props.show} clickHandler={this.props.modalClosedHandler} />
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        visibility: this.props.show ? 'visible' : 'hidden'
                    }}
                >
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
}


export default Modal;