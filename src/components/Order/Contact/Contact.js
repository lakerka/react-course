import React, { Component } from 'react';
import ButtonComponent from '../../UI/Button/Button';

import classes from './Contact.css';

class Contact extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    };

    render() {
        return (
            <div className={classes.Contact}>
                <h4>Enter your contact data</h4>
                <form>
                    <input type="text" name="name" placeholder="Your name"/>
                    <input type="text" name="email" placeholder="Your email"/>
                    <input type="text" name="street" placeholder="Your street"/>
                    <input type="text" name="postCode" placeholder="Your postal code"/>
                    <ButtonComponent buttonType="Success">Order</ButtonComponent>
                </form>
            </div>
        );
    }
}

export default Contact;
