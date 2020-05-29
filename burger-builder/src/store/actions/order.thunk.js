import * as actionTypes from './actionTypes'

import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error,
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
}

export const purchaseBurger = (orderData, token) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart())
        const url = '/orders.json?auth=' + token
        axios
            .post(url, orderData)
            .then((response) => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch((error) => {
                dispatch(purchaseBurgerFail(error))
            })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    }
}

export const loadOrdersSuccess = (orders) => {
    return {
        type: actionTypes.LOAD_ORDERS_SUCCESS,
        orders: orders,
    }
}

export const loadOrdersFail = () => {
    return {
        type: actionTypes.LOAD_ORDERS_FAIL,
    }
}

export const loadOrdersStart = () => {
    return {
        type: actionTypes.LOAD_ORDERS_START,
    }
}

export const loadOrders = (token, userId) => {
    return (dispatch) => {
        dispatch(loadOrdersStart())
        const queryParams =
            '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        axios
            .get('/orders.json' + queryParams)
            .then((response) => {
                var dataOrders = Object.keys(response.data).map((oKey) => {
                    return {
                        key: oKey,
                        ...response.data[oKey],
                    }
                })
                dispatch(loadOrdersSuccess(dataOrders))
            })
            .catch((error) => {
                dispatch(loadOrdersFail())
            })
    }
}
