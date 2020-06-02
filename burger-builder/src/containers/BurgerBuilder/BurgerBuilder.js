import React, { useState, useEffect, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import axios from '../../axios-orders';

import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/index';

const BurgerBuilder = (props) => {

    const [ purchasing, setPurchasing ] = useState(false)

    const ings = useSelector((state) => state.burger.ingredients)
    const total = useSelector((state) => state.burger.totalPrice)
    const error = useSelector((state) => state.burger.error)
    const isAuthenticated = useSelector((state) => state.auth.token !== null)

    const dispatch = useDispatch()

    const addIngredient = (ingredient) =>
            dispatch(actions.addIngredient(ingredient))
    const removeIngredient = (ingredient) =>
            dispatch(actions.removeIngredient(ingredient))
    const initIngredients =
        useCallback(() => 
            dispatch(actions.initIngredients())
        , [])
    const initPurchase = () => dispatch(actions.purchaseInit())
    const setAuthRedirect = (path) => dispatch(actions.setAuthRedirect(path))

    useEffect(() => {
        initIngredients()
    }, [initIngredients])

    const updatePurchaseSate = () => {
        const sum = Object.keys(ings)
            .map((igKey) => {
                return ings[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)

        return sum > 0
    }

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true)
        } else {
            setAuthRedirect('/checkout')
            props.history.push('/auth')
        }
    }

    const cancelPurchaseHandler = () => {
        setPurchasing(false)
    }

    const continuePurchaseHandler = () => {
        initPurchase()
        props.history.push('/checkout')
    }

    const disabledInfo = {
        ...ings,
    }

    for (let key in disabledInfo) {
        disabledInfo[key] = ings[key] <= 0
    }

    let orderSummary = (
        <OrderSummary
            ingredients={ings}
            cancel={cancelPurchaseHandler}
            continue={continuePurchaseHandler}
            totalPrice={total}
        />
    )

    let burger = error ? (
        <p>Ingredients can't be loaded!</p>
    ) : (
        <Spinner />
    )

    if (ings) {
        burger = (
            <Aux>
                <Burger ingredients={ings} />
                <BuildControls
                    isAuth={isAuthenticated}
                    purchasable={!updatePurchaseSate()}
                    price={total}
                    disabled={disabledInfo}
                    ingredientAdded={addIngredient}
                    ingredientRemoved={removeIngredient}
                    purchasing={purchaseHandler}
                />
            </Aux>
        )
    }

    return (
        <Aux>
            <Modal
                show={purchasing}
                modalClosed={cancelPurchaseHandler}
            >
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    )
}

export default withErrorHandler(BurgerBuilder, axios)
