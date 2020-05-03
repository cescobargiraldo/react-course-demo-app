import React, {Component} from 'react';

import classes from './Orders.css';

import axios from '../../axios-orders';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {

    componentDidMount(){
        this.props.loadOrders(this.props.token);
    }

    render() {
        let ordersToShow = this.props.loading ? <Spinner /> : <h3>No orders yet!</h3>;

        if(this.props.orders && this.props.orders.length > 0){
            ordersToShow = this.props.orders.map((order) => {
                return (
                    <li key={order.key}>
                        <Order order={order}/>
                    </li>
                )
            });
        }
        return (
            <div className={classes.Orders}>
                <h1>Your Orders</h1>
                <ul>
                    {ordersToShow}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadOrders: (token) => dispatch(actions.loadOrders(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));