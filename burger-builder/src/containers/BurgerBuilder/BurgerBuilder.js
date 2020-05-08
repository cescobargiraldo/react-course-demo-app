import React, { Component } from 'react'

import { connect } from 'react-redux'

import axios from '../../axios-orders'

import Aux from '../../hoc/Auxilliary/Auxilliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import * as actions from '../../store/actions/index'

export class BurgerBuilder extends Component {
    state = {
        totalPrice: 4,
        purchasing: false,
    }

    componentDidMount() {
        this.props.initIngredients()
    }

    updatePurchaseSate() {
        const sum = Object.keys(this.props.ings)
            .map((igKey) => {
                return this.props.ings[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)

        return sum > 0
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true })
        } else {
            this.props.setAuthRedirect('/checkout')
            this.props.history.push('/auth')
        }
    }

    cancelPurchaseHandler = () => {
        this.setState({ purchasing: false })
    }

    continuePurchaseHandler = () => {
        this.props.initPurchase()
        this.props.history.push('/checkout')
    }

    render() {
        const disabledInfo = {
            ...this.props.ings,
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = this.props.ings[key] <= 0
        }

        let orderSummary = (
            <OrderSummary
                ingredients={this.props.ings}
                cancel={this.cancelPurchaseHandler}
                continue={this.continuePurchaseHandler}
                totalPrice={this.state.totalPrice}
            />
        )

        let burger = this.props.error ? (
            <p>Ingredients can't be loaded!</p>
        ) : (
            <Spinner />
        )

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        isAuth={this.props.isAuthenticated}
                        purchasable={!this.updatePurchaseSate()}
                        price={this.props.total}
                        disabled={disabledInfo}
                        ingredientAdded={this.props.addIngredient}
                        ingredientRemoved={this.props.removeIngredient}
                        purchasing={this.purchaseHandler}
                    />
                </Aux>
            )
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.cancelPurchaseHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burger.ingredients,
        total: state.burger.totalPrice,
        error: state.burger.error,
        isAuthenticated: state.auth.token !== null,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredient: (ingredient) =>
            dispatch(actions.addIngredient(ingredient)),
        removeIngredient: (ingredient) =>
            dispatch(actions.removeIngredient(ingredient)),
        initIngredients: () => dispatch(actions.initIngredients()),
        initPurchase: () => dispatch(actions.purchaseInit()),
        setAuthRedirect: (path) => dispatch(actions.setAuthRedirect(path)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
