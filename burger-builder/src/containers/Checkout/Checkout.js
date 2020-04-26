import React, {Component} from 'react';

import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {},
        totalPrice: 0
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = 0;

        for(let param of query.entries()){
            if(param[0] === 'totalPrice'){
                totalPrice = +param[1];
            }else{
                ingredients[param[0]] = +param[1];
            }
        }

        console.log(ingredients);

        this.setState({
            ingredients: ingredients,
            totalPrice: totalPrice
        })
    }

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
                    ingredients={this.state.ingredients}
                    confirm={this.confirmCheckoutHandler}
                    cancel={this.cancelCheckoutHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={() => <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice}/> } />
            </div>
        );
    }
}

export default Checkout;