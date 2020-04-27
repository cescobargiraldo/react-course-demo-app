import React, {Component} from 'react';

import {connect} from 'react-redux';

import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actionTypes from '../../store/actions';


const INFGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        // axios.get('https://react-burger-builder-34354.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({
        //             ingredients: {
        //                 ...response.data
        //             }
        //         });
        //     }).catch(error => {
        //         this.setState({
        //             error: true
        //         })
        //     });
    }

    updatePurchaseSate (ingredients){

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) =>{
                return sum + el;
            }, 0);

        this.setState({
            purchasable: sum > 0
        });
    };

    addIngredientHandler = (type) => {
        // const oldCount = this.state.ingredients[type];
        // const updatedCount = oldCount + 1;
        // const updateIngredients = {
        //     ...this.state.ingredients
        // };

        // updateIngredients[type] = updatedCount;

        // const priceAddition = INFGREDIENT_PRICES[type];
        // const oldPrice = this.state.totalPrice;
        // const newPrice = oldPrice + priceAddition;

        // this.setState({
        //     totalPrice: newPrice,
        //     ingredients: updateIngredients
        // });
        // this.updatePurchaseSate(updateIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0){
            return;
        }

        const updatedCount = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        };

        updateIngredients[type] = updatedCount;

        const priceSubtraction = INFGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubtraction;

        this.setState({
            totalPrice: newPrice,
            ingredients: updateIngredients
        });
        this.updatePurchaseSate(updateIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    cancelPurchaseHandler = () => {
        this.setState({purchasing: false});
    }

    continuePurchaseHandler = () => {
        let queryParams = '?';

        queryParams += Object.keys(this.state.ingredients).map((igKey) => {
            return encodeURIComponent(igKey) + "=" + encodeURIComponent(this.state.ingredients[igKey]);
        }).join('&');

        queryParams += "&totalPrice=" + encodeURIComponent(this.state.totalPrice.toFixed(2));
        
        this.props.history.push({
            pathname: '/checkout',
            search: queryParams
        });
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        }

        for(let key in disabledInfo){
            disabledInfo[key] = this.props.ings[key] <= 0;
        }

        let orderSummary = <OrderSummary 
                            ingredients={this.props.ings} 
                            cancel={this.cancelPurchaseHandler}
                            continue={this.continuePurchaseHandler} 
                            totalPrice={this.state.totalPrice} />

        if(this.state.loading){
            orderSummary = <Spinner />;
        }

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        purchasable={!this.state.purchasable}
                        price={this.state.totalPrice}
                        disabled={disabledInfo}
                        ingredientAdded={this.props.addIngredient} 
                        ingredientRemoved={this.props.removeIngredient} 
                        purchasing={this.purchaseHandler}
                        />
                </Aux>
            );
        }
        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    };
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingredient) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingredient}),
        removeIngredient: (ingredient) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredient})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));