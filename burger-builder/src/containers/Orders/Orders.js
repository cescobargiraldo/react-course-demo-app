import React, { useEffect } from 'react'

import classes from './Orders.css'

import axios from '../../axios-orders'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const Orders = (props) => {

    const { loadOrders, token, userId } = props

    useEffect(() => {
        loadOrders(token, userId)
    }, [loadOrders, token, userId])

    let ordersToShow = props.loading ? (
        <Spinner />
    ) : (
        <h3>No orders yet!</h3>
    )

    if (props.orders && props.orders.length > 0) {
        ordersToShow = props.orders.map((order) => {
            return (
                <li key={order.key}>
                    <Order order={order} />
                </li>
            )
        })
    }
    return (
        <div className={classes.Orders}>
            <h1>Your Orders</h1>
            <ul>{ordersToShow}</ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadOrders: (token, userId) =>
            dispatch(actions.loadOrders(token, userId)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Orders, axios))
