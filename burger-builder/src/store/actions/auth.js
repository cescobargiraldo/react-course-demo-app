import axios from 'axios'

import * as actionTypes from './actionTypes'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: authData.localId,
        token: authData.idToken,
    }
}

export const authFail = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err,
    }
}

export const logout = () => {
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
                dispatch(authSuccess(res.data))
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
