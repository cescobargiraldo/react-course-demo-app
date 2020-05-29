import { put } from 'redux-saga/effects'
import axios from '../../axios-orders';
import * as actions from '../actions'

export function* loadOrdersSaga(action) {
    yield put(actions.loadOrdersStart())
    const queryParams =
        '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"'
    try{
        const response = yield axios.get('/orders.json' + queryParams)
        var dataOrders = yield Object.keys(response.data).map((oKey) => {
            return {
                key: oKey,
                ...response.data[oKey],
            }
        })
        yield put(actions.loadOrdersSuccess(dataOrders))
    }catch(error){
        yield put(actions.loadOrdersFail())
    }
}

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart())
    try{
        const url = '/orders.json?auth=' + action.token
        const response = yield axios.post(url, action.orderData)
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData))
    }catch(error){
        yield put(actions.purchaseBurgerFail(error))
    }
}