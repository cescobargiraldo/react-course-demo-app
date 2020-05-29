import { takeEvery, all, takeLatest } from 'redux-saga/effects'

import * as actionTypes from '../actions/actionTypes'
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth'
import { initSetIngredientsSaga } from './burger'
import { loadOrdersSaga, purchaseBurgerSaga } from './order'

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
    ])
}

export function* watchBurger() {
    yield takeEvery(actionTypes.INIT_SET_INGREDIENTS, initSetIngredientsSaga)
}

export function* watchOrder() {
    yield takeEvery(actionTypes.LOAD_ORDERS, loadOrdersSaga)
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga)
}