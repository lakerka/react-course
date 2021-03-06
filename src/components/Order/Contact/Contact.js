import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import ButtonComponent from '../../UI/Button/Button';
import classes from './Contact.css';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';
import * as actions from '../../../store/actions/index';
import client from '../../../config';
import { validateInput, validateForm } from '../../../shared/utils';

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
    };

    orderSuccessHandler = () => {
        // where should we put this ?
        this.props.history.push('/');
    };

    getContactData() {
        const contactData = {};
        for(const input of this.state.contactDataForm.inputs) {
            contactData[input.name] = input.value;
        }
        return contactData;
    }

    orderHandler = (event) => {
        event.preventDefault();
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            contactData: this.getContactData(),
            userId: this.props.userId,
        };
        this.props.orderBurger(order, this.props.token);
    };

    formChangeHandler(event, index) {
        const contactDataForm = _.cloneDeep(this.state.contactDataForm);
        const input = contactDataForm.inputs[index];
        input.touched = true;
        input.value = event.target.value;
        validateInput(input);
        validateForm(contactDataForm);
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
                { this.props.loading ? spinner : form }
            </div>
        );
    }
}

const mapStateToProps = ({ burgerBuilder, order, auth }) => ({
    ingredients: burgerBuilder.ingredients,
    totalPrice: burgerBuilder.totalPrice,
    loading: order.loading,
    token: auth.token,
    userId: auth.userId,
});

const mapDispatchToProps = dispatch => {
    return {
      orderBurger: (order, token) => dispatch(actions.orderBurger(order, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Contact, client));
