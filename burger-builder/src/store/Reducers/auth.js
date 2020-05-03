import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirect: '/',
}

const authStart = (state) => {
    return updateObject(state, {
        loading: true,
        error: null,
    })
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        userId: action.userId,
        loading: false,
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error,
    })
}

const authLogout = (state) => {
    return updateObject(state, {
        token: null,
        userId: null,
    })
}

const authRedirect = (state, action) => {
    return updateObject(state, {
        authRedirect: action.path,
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AUTH_REDIRECT:
            return authRedirect(state, action)
        case actionTypes.AUTH_START:
            return authStart(state)
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action)
        case actionTypes.AUTH_FAIL:
            return authFail(state, action)
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state)
        default:
            return state
    }
}

export default reducer
