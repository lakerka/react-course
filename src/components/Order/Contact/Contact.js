import React, { Component } from 'react';
import _ from 'lodash';

import ButtonComponent from '../../UI/Button/Button';
import classes from './Contact.css';
import client from '../../../config';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';


class Contact extends Component {
    state = {
        contactDataForm: [
            {
                inputtype: 'input',
                inputConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                name: 'name',
                value: ''
            },
            {
                inputtype: 'input',
                inputConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                name: 'email',
                value: ''
            },
            {
                inputtype: 'input',
                inputConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                name: 'street',
                value: ''
            },
            {
                inputtype: 'input',
                inputConfig: {
                    type: 'number',
                    placeholder: 'ZIP code'
                },
                name: 'postalCode',
                value: ''
            },
            {
                inputtype: 'select',
                inputConfig: {
                    type: 'select',
                    options: [
                        { value: 'premium', displayValue: 'Premium' },
                        { value: 'simple', displayValue: 'Simple' }
                    ]
                },
                name: 'deliveryMethod',
                value: 'simple'
            }
        ],
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

        const contactData = {};
        for(const input of this.state.contactDataForm) {
            contactData[input.name] = input.value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            contactData: contactData
        };

        client.post('/orders.json', order)
            .then(response => this.orderSuccessHandler())
            .catch(error => this.orderErrorHandler());
    };

    formChangeHandler(event, index) {
        const contactDataForm = _.cloneDeep(this.state.contactDataForm);
        contactDataForm[index].value = event.target.value;
        this.setState({ contactDataForm });
    }

    render() {
        const inputs = this.state.contactDataForm.map((input, i) =>
            <Input
                key={i}
                onChange={(event) => this.formChangeHandler(event, i)}
                {...input}
            />
        );
        const form = (
            <form>
                {inputs}
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
