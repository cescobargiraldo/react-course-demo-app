import React, { useState } from 'react'

import classes from './ContactData.css'

import axios from '../../../axios-orders'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

import { updateObject, checkInputValidity } from '../../../shared/utility'

import * as actions from '../../../store/actions/index'

const ContactData = (props) => {
    const [formData, setFormData ] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name',
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 50,
            },
            valid: false,
            touched: false,
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Street',
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 50,
            },
            valid: false,
            touched: false,
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code',
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5,
            },
            valid: false,
            touched: false,
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country',
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 20,
            },
            valid: false,
            touched: false,
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your E-Mail',
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 250,
            },
            valid: false,
            touched: false,
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' },
                ],
            },
            value: 'fastest',
            validation: null,
            valid: true,
        },
    })

    const [validForm, setValidForm] = useState(false)

    const orderHandler = (event) => {
        event.preventDefault()

        var contactData = {}

        for (let key in formData) {
            contactData[key] = formData[key].value
        }

        const order = {
            ingredients: props.ings,
            price: props.total,
            orderData: contactData,
            userId: props.userId,
        }

        props.purchaseBurger(order, props.token)
    }

    const inputChangedHandler = (event, inputId) => {
        const updatedInputElement = updateObject(
            formData[inputId],
            {
                value: event.target.value,
                valid: checkInputValidity(
                    event.target.value,
                    formData[inputId].validation
                ),
                touched: true,
            }
        )

        const updatedOrderForm = updateObject(formData, {
            [inputId]: updatedInputElement,
        })

        let formIsValid = true

        for (let key in updatedOrderForm) {
            formIsValid = formIsValid && updatedOrderForm[key].valid
        }

        setFormData(updatedOrderForm)
        setValidForm(formIsValid)
    }

    const formElementsArray = []

    for (let key in formData) {
        formElementsArray.push({
            id: key,
            config: formData[key],
        })
    }

    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map((el) => {
                return (
                    <Input
                        key={el.id}
                        elementType={el.config.elementType}
                        elementConfig={el.config.elementConfig}
                        value={el.config.value}
                        options={el.config.options}
                        invalid={!el.config.valid}
                        validate={el.config.validation}
                        touched={el.config.touched}
                        inputChanged={(event) =>
                            inputChangedHandler(event, el.id)
                        }
                    />
                )
            })}
            <Button btnType="Success" disabled={!validForm}>
                ORDER
            </Button>
        </form>
    )

    if (props.loading) {
        form = <Spinner />
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data:</h4>
            {form}
        </div>
    )
}

const mapSateToProps = (state) => {
    return {
        ings: state.burger.ingredients,
        total: state.burger.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        purchaseBurger: (orderData, token) =>
            dispatch(actions.purchaseBurger(orderData, token)),
    }
}

export default connect(
    mapSateToProps,
    mapDispatchToProps
)(withErrorHandler(withRouter(ContactData), axios))
