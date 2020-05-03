import React, {Component} from 'react';

import {Route, Redirect} from 'react-router-dom';
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
        let summary = <Redirect to="/" />;

        if(this.props.ings){
            let purchasedRedirect = this.props.purchased ? <Redirect to="/my-orders" /> : null;
            summary = ( 
                <div>
                    {purchasedRedirect}
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

        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burger.ingredients,
        total: state.burger.totalPrice,
        purchased: state.order.purchased
    }
};

export default  connect(mapStateToProps, null)(Checkout);