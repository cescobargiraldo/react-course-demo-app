import React, {Component} from 'react';

import {Route} from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    confirmCheckoutHandler = () => {
        this.props.history.push('/checkout/contact-data');

    }

    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    }

    render(){
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    confirm={this.confirmCheckoutHandler}
                    cancel={this.cancelCheckoutHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        total: state.totalPrice
    }
}


export default  connect(mapStateToProps, null)(Checkout);