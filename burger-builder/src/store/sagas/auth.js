import { put, delay, call } from 'redux-saga/effects'
import axios from 'axios'
import * as actions from '../actions'

export function* logoutSaga(action){
    // yield localStorage.removeItem('token')
    yield call([localStorage, 'removeItem'], 'token')
    // yield localStorage.removeItem('expDate')
    yield call([localStorage, 'removeItem'], 'expDate')
    // yield localStorage.removeItem('userId')
    yield call([localStorage, 'removeItem'], 'userId')
    yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expiresIn * 1000)
    yield put(actions.logout())
}

export function* authUserSaga(action) {
    yield put(actions.authStart())

    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true,
    }

    const apiKey = 'AIzaSyCoNUITNrOHjBSpaJj3cCOqS-954qda3uo'

    let url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='

    if (!action.isSignUp) {
        url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
    }

    try{
        const response = yield axios.post(url + apiKey, authData)
        yield localStorage.setItem('token', response.data.idToken)
        const expirationDate = yield new Date(
            new Date().getTime() + response.data.expiresIn * 1000
        )
        yield localStorage.setItem('expDate', expirationDate)
        yield localStorage.setItem('userId', response.data.localId)
        yield put(actions.authSuccess(response.data.localId, response.data.idToken))
        yield put(actions.checkAuthTimeout(response.data.expiresIn))
    }catch(err){
        yield put(actions.authFail(err))
    }
}

export function* authCheckStateSaga() {
    const token = yield localStorage.getItem('token')
    if (!token) {
        yield put(actions.logout())
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expDate'))
        const userId = yield localStorage.getItem('userId')
        if (new Date() < expirationDate) {
            yield put(actions.authSuccess(userId, token))
            yield put(
                actions.checkAuthTimeout(
                    (expirationDate.getTime() - new Date().getTime()) / 1000
                )
            )
        } else {
            yield put(actions.logout())
        }
    }
}