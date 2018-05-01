import React, { Component } from 'react';
import _ from 'lodash';

import ButtonComponent from '../../UI/Button/Button';
import classes from './Contact.css';
import client from '../../../config';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';


class Contact extends Component {
    state = {
        contactDataForm: {
            valid: false,
            inputs: [
                {
                    inputtype: 'input',
                    inputConfig: {
                        type: 'text',
                        placeholder: 'Name'
                    },
                    valid: false,
                    touched: false,
                    validation: {
                        required: true
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
                    valid: false,
                    touched: false,
                    validation: {
                        required: true
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
                    valid: false,
                    touched: false,
                    validation: {
                        required: true
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
                    valid: false,
                    touched: false,
                    validation: {
                        required: true
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
            ]
        },
        loading: false
    };

    orderSuccessHandler = () => {
        this.setState({ loading: false });
        this.props.history.push('/');
    };

    orderErrorHandler = () => this.setState({ loading: false });

    getContactData() {
        const contactData = {};
        for(const input of this.state.contactDataForm) {
            contactData[input.name] = input.value;
        }
        return contactData;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            contactData: this.getContactData()
        };

        client.post('/orders.json', order)
            .then(() => this.orderSuccessHandler())
            .catch(() => this.orderErrorHandler());
    };

    static validateInput(input) {
        if (input.validation === undefined) {
            return;
        }
        let valid = true;
        if (input.validation.required && input.value.trim() === '') {
            valid = false;
        }
        input.valid = valid;
    }


    static validateForm(form) {
        let valid = true;
        for(const input of form.inputs) {
            if (input.validation) {
                 valid = input.valid && valid;
            }
        }
        form.valid = valid;
    }

    formChangeHandler(event, index) {
        const contactDataForm = _.cloneDeep(this.state.contactDataForm);
        const input = contactDataForm.inputs[index];
        input.touched = true;
        input.value = event.target.value;
        Contact.validateInput(input);
        Contact.validateForm(contactDataForm);
        this.setState({ contactDataForm });
    }

    render() {
        const inputs = this.state.contactDataForm.inputs.map((input, i) =>
            <Input
                key={i}
                onChange={(event) => this.formChangeHandler(event, i)}
                {...input}
            />
        );
        const form = (
            <form>
                {inputs}
                <ButtonComponent
                    buttonType="Success"
                    clickHandler={this.orderHandler}
                    disabled={!this.state.contactDataForm.valid}
                >
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
