import * as actionTypes from './actionTypes'

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
    return {
        type: actionTypes.PURCHASE_BURGER,
        orderData: orderData,
        token: token,
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
    return {
        type: actionTypes.LOAD_ORDERS,
        token: token,
        userId: userId,
    }
}
