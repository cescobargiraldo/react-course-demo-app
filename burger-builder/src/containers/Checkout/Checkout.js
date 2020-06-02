import React from 'react';

import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {

    const confirmCheckoutHandler = () => {
        props.history.push('/checkout/contact-data');

    }

    const cancelCheckoutHandler = () => {
        props.history.goBack();
    }

    let summary = <Redirect to="/" />;

    if(props.ings){
        let purchasedRedirect = props.purchased ? <Redirect to="/my-orders" /> : null;
        summary = ( 
            <div>
                {purchasedRedirect}
                    <CheckoutSummary 
                ingredients={props.ings}
                confirm={confirmCheckoutHandler}
                cancel={cancelCheckoutHandler} />
                <Route 
                    path={props.match.path + '/contact-data'} 
                    component={ContactData} />
            </div>
            
        );
    }

    return summary;
}

const mapStateToProps = (state) => {
    return {
        ings: state.burger.ingredients,
        total: state.burger.totalPrice,
        purchased: state.order.purchased
    }
};

export default  connect(mapStateToProps, null)(Checkout);