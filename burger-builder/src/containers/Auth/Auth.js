import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import classes from './Auth.css'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'

import { updateObject, checkInputValidity } from '../../shared/utility'

import * as actions from '../../store/actions/index'

const Auth = (props) => {
    const [controls, setControls] = useState({
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
    })

    const [isSignUp, setIsSignUp] = useState(false)

    const { building, authRedirect, onSetAuthRedirect } = props

    useEffect(() => {
        if (!building && authRedirect !== '/') {
            onSetAuthRedirect('/')
        }
    }, [building, authRedirect, onSetAuthRedirect])

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: checkInputValidity(
                    event.target.value,
                    controls[controlName].validation
                ),
                touched: true,
            }),
        })

        setControls(updatedControls)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        props.onAuth(
            controls['email'].value,
            controls['password'].value,
            isSignUp
        )
    }

    const toggleSignUpHandler = () => {
        setIsSignUp(!isSignUp)
    }

    const formElementsArray = []

    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key],
        })
    }

    let form = <Spinner />

    if (!props.loading) {
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
                        inputChangedHandler(event, el.id)
                    }
                />
            )
        })
    }

    let errorMessage = null

    if (props.error) {
        errorMessage = <p>{props.error.message}</p>
    }

    let authRedirectAction = null

    if (props.isAuthenticated) {
        authRedirectAction = <Redirect to={props.authRedirect} />
    }

    return (
        <div className={classes.Auth}>
            {authRedirectAction}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Button>
            </form>
            <Button btnType="Danger" click={toggleSignUpHandler}>
                Switch to {isSignUp ? 'Sign In' : 'Sign Up'}
            </Button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirect: state.auth.authRedirect,
        building: state.burger.building,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) =>
            dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirect: (path) => dispatch(actions.setAuthRedirect(path)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
