import React, { Component } from 'react';
import ButtonComponent from '../../UI/Button/Button';

import classes from './Contact.css';
import client from '../../../config';
import Spinner from '../../UI/Spinner/Spinner';


class Contact extends Component {
    state = {
        contactData: {
            name: '',
            email: '',
            address: {
                street: '',
                postalCode: ''
            }
        },
        loading: false
    };

    orderSuccessHandler = () => {
        this.setState({ loading: false });
        this.props.history.push('/');
    };

    orderErrorHandler = () => this.setState({ loading: false });

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            contactData: this.state.contactData
        };
        client.post('/orders.json', order)
            .then(response => this.orderSuccessHandler())
            .catch(error => this.orderErrorHandler());
    };

    render() {
        const form = (
            <form>
                <input type="text" name="name" placeholder="Your name"/>
                <input type="text" name="email" placeholder="Your email"/>
                <input type="text" name="street" placeholder="Your street"/>
                <input type="text" name="postCode" placeholder="Your postal code"/>
                <ButtonComponent buttonType="Success" clickHandler={this.orderHandler}>
                    Order
                </ButtonComponent>
            </form>
        );
        const spinner = <Spinner />;

        return (
            <div className={classes.Contact}>
                <h4>Enter your contact data</h4>
                { this.state.loading ? spinner : form }
            </div>
        );
    }
}

export default Contact;
