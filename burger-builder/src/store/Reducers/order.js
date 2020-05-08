import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
}

const purchaseInit = (state) => {
    return updateObject(state, {
        purchased: false,
    })
}

const purchaseStart = (state) => {
    return updateObject(state, {
        loading: true,
    })
}

const purchaseSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { key: action.orderId })
    return {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder),
    }
}

const purchaseFail = (state) => {
    return updateObject(state, {
        loading: false,
    })
}

const loadOrdersStart = (state) => {
    return updateObject(state, {
        orders: [],
        loading: true,
    })
}

const loadOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false,
    })
}

const loadOrdersFail = (state) => {
    return updateObject(state, {
        loading: false,
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return purchaseInit(state)
        case actionTypes.PURCHASE_BURGER_START:
            return purchaseStart(state)
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseSuccess(state, action)
        case actionTypes.PURCHASE_BURGER_FAIL:
            return purchaseFail(state)
        case actionTypes.LOAD_ORDERS_START:
            return loadOrdersStart(state)
        case actionTypes.LOAD_ORDERS_SUCCESS:
            return loadOrdersSuccess(state, action)
        case actionTypes.LOAD_ORDERS_FAIL:
            return loadOrdersFail(state)
        default:
            return state
    }
}

export default reducer
