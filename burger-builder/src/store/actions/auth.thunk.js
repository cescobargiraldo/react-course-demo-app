import axios from 'axios'

import * as actionTypes from './actionTypes'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (userId, token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        token: token,
    }
}

export const authFail = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err,
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const checkAuthTimeout = (expiresIn) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout())
        }, expiresIn * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    return (dispatch) => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }

        const apiKey = 'AIzaSyCoNUITNrOHjBSpaJj3cCOqS-954qda3uo'

        let url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='

        if (!isSignUp) {
            url =
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
        }

        axios
            .post(url + apiKey, authData)
            .then((res) => {
                localStorage.setItem('token', res.data.idToken)
                const expirationDate = new Date(
                    new Date().getTime() + res.data.expiresIn * 1000
                )
                localStorage.setItem('expDate', expirationDate)
                localStorage.setItem('userId', res.data.localId)
                dispatch(authSuccess(res.data.localId, res.data.idToken))
                dispatch(checkAuthTimeout(res.data.expiresIn))
            })
            .catch((err) => {
                dispatch(authFail(err))
            })
    }
}

export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path,
    }
}

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expDate'))
            const userId = localStorage.getItem('userId')
            if (new Date() < expirationDate) {
                dispatch(authSuccess(userId, token))
                dispatch(
                    checkAuthTimeout(
                        (expirationDate.getTime() - new Date().getTime()) / 1000
                    )
                )
            } else {
                dispatch(logout())
            }
        }
    }
}
