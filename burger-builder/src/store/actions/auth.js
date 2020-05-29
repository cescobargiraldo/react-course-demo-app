
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
        type: actionTypes.AUTH_INITIATE_LOGOUT,
    }
}

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const checkAuthTimeout = (expiresIn) => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expiresIn: expiresIn
    }
}

export const auth = (email, password, isSignUp) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password, 
        isSignUp: isSignUp
    }
}

export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path,
    }
}

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE,
    }
}
