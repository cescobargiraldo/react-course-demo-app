import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import classes from './Auth.css'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'

import * as actions from '../../store/actions/index'

export class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-Mail',
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
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
        },
        isSignUp: false,
    }

    checkInputValidity = (value, rules) => {
        let valid = true

        if (!rules) {
            return valid
        }

        if (rules.required) {
            valid = value !== '' && valid
        }

        if (rules.minLength) {
            valid = value.length >= rules.minLength && valid
        }

        if (rules.maxLength) {
            valid = value.length <= rules.maxLength && valid
        }

        return valid
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkInputValidity(
                    event.target.value,
                    this.state.controls[controlName].validation
                ),
                touched: true,
            },
        }

        this.setState({
            controls: updatedControls,
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(
            this.state.controls['email'].value,
            this.state.controls['password'].value,
            this.state.isSignUp
        )
    }

    toggleSignUpHandler = () => {
        this.setState((prevState) => {
            return {
                isSignUp: !prevState.isSignUp,
            }
        })
    }

    render() {
        const formElementsArray = []

        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            })
        }

        let form = <Spinner />

        if (!this.props.loading) {
            form = formElementsArray.map((el) => {
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
                            this.inputChangedHandler(event, el.id)
                        }
                    />
                )
            })
        }

        let errorMessage = null

        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>
        }

        let authRedirect = null

        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirect} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">
                        {this.state.isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                </form>
                <Button btnType="Danger" click={this.toggleSignUpHandler}>
                    Swith to {this.state.isSignUp ? 'Sign In' : 'Sign Up'}
                </Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirect: state.auth.authRedirect,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) =>
            dispatch(actions.auth(email, password, isSignUp)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
