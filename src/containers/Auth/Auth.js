import React, { Component } from 'react';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import ButtonComponent from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        isSignUp: false,
        form: {
            valid: false,
            inputs: [
                {
                    inputtype: 'input',
                    inputConfig: {
                        type: 'email',
                        placeholder: 'Email'
                    },
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        isEmail: true,
                    },
                    name: 'email',
                    value: ''
                },
                {
                    inputtype: 'input',
                    inputConfig: {
                        type: 'password',
                        placeholder: 'Password'
                    },
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        minLength: 6
                    },
                    name: 'password',
                    value: ''
                },
            ]
        }
    };

    static validateInput(input) {
        if (input.validation === undefined) {
            return;
        }
        let valid = true;
        if (input.validation.required && input.value.trim() === '') {
            valid = false;
        }
        if (input.validation.minLength && input.value.trim().length < input.validation.minLength) {
            valid = false;
        }
        if (input.validation.isEmail && !input.value.trim().includes('@') ) {
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

    formChangeHandler = (event, index) => {
        const form = _.cloneDeep(this.state.form);
        const input = form.inputs[index];
        input.touched = true;
        input.value = event.target.value;
        Auth.validateInput(input);
        Auth.validateForm(form);
        this.setState({ form });
    };

    submitHandler = event => {
        event.preventDefault();
        const nameInput = _.find(this.state.form.inputs, input => input.name === 'email');
        const passwordInput = _.find(this.state.form.inputs, input => input.name === 'password');
        this.props.auth(nameInput.value, passwordInput.value, this.state.isSignUp);
    };

    authMethodHandler = (event) => {
        event.preventDefault();
        this.setState({ isSignUp: !this.state.isSignUp });
    };

    render() {
        if (this.props.isAuthenticated) {
            if (this.props.buildingBurger) {
                return <Redirect to="/checkout" />;
            } else {
                return <Redirect to="/" />;
            }
        }

        const spinner = <Spinner/>;
        const inputs = this.state.form.inputs.map((input, i) =>
            <Input
                key={i}
                onChange={(event) => this.formChangeHandler(event, i)}
                {...input}
            />
        );
        let error = null;
        if (this.props.error) {
            error = <p>{this.props.error}</p>;
        }

        const form = (
            <form>
                {error}
                {inputs}
                <ButtonComponent
                    buttonType="Success"
                    clickHandler={this.submitHandler}
                    disabled={!this.state.form.valid}
                >
                    { this.state.isSignUp ? 'Signup' : 'Signin' }
                </ButtonComponent>
                <ButtonComponent
                    buttonType="Danger"
                    clickHandler={this.authMethodHandler}
                >
                    Switch to { this.state.isSignUp ? 'signin' : 'signup' }
                </ButtonComponent>
            </form>
        );

        return (
            <div className={classes.Auth}>
                { this.props.loading ? spinner : form }
            </div>
        );
    }
}

const mapStateToProps = ({ burgerBuilder, auth }) => ({
    loading: auth.loading,
    error: auth.error,
    isAuthenticated: auth.isAuthenticated,
    buildingBurger: burgerBuilder.building,
});

const mapDispatchToProps = dispatch => ({
    auth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
});


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
