import React, {Component, isValidElement} from 'react';

import classes from './ContactData.css';

import axios from '../../../axios-orders';

import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state={
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 50
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 50
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 20
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 250
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: 'fastest',
                validation: null,
                valid: true
            }
        },
        validForm: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        var contactData = {};

        for(let key in this.state.orderForm){
            contactData[key] = this.state.orderForm[key].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.total,
            orderData: contactData
        }

        this.props.purchaseBurger(order, this.props.token);
    }

    checkInputValidity = (value, rules) => {
        let valid = true;

        if(!rules){
            return valid;
        }

        if(rules.required){
            valid = value !== '' && valid;
        }

        if(rules.minLength){
            valid = value.length >= rules.minLength && valid;
        }

        if(rules.maxLength){
            valid = value.length <= rules.maxLength && valid;
        }

        return valid;
    }

    inputChangedHandler = (event, inputId) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedInputElement = {
            ...updatedOrderForm[inputId]
        }

        updatedInputElement.value = event.target.value;
        updatedInputElement.valid = 
            this.checkInputValidity(event.target.value, updatedInputElement.validation);
        updatedInputElement.touched = true;

        updatedOrderForm[inputId] = updatedInputElement;

        let formIsValid = true;

        for(let key in updatedOrderForm){
            formIsValid = formIsValid && updatedOrderForm[key].valid;
        }

        this.setState({
            orderForm: updatedOrderForm,
            validForm: formIsValid
        });
    }

    render(){
        const formElementsArray = [];

        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map((el) => {
                    return <Input key={el.id}
                            elementType={el.config.elementType} 
                            elementConfig={el.config.elementConfig} 
                            value={el.config.value} 
                            options={el.config.options}
                            invalid={!el.config.valid}
                            validate={el.config.validation}
                            touched={el.config.touched}
                            inputChanged={(event) => this.inputChangedHandler(event, el.id)} />;
                })}
                <Button btnType="Success" disabled={!this.state.validForm}>ORDER</Button>
            </form>
        );

        if(this.props.loading){
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data:</h4>
                {form}
            </div>
        );
    }
}

const mapSateToProps = (state) => {
    return {
        ings: state.burger.ingredients,
        total: state.burger.totalPrice, 
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        purchaseBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
};

export default connect(mapSateToProps, mapDispatchToProps)(withErrorHandler(withRouter(ContactData), axios));