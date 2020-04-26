import React, {Component} from 'react';

import classes from './Orders.css';

import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
    state={
        orders: null,
        loading: true
    }

    componentDidMount(){
        axios.get('/orders.json')
            .then((response) => {
                var dataOrders = Object.keys(response.data).map((oKey)=> {
                    return {
                        key: oKey,
                        ...response.data[oKey]
                    };
                });

                this.setState({
                    orders: dataOrders,
                    loading: false
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    loading: false
                });
            });
    }

    render() {
        let ordersToShow = <Spinner />
        if(this.state.orders){
            ordersToShow = this.state.orders.map((order) => {
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

export default withErrorHandler(Orders, axios);