import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const INFGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const updateIngredient = (state, action, addition) => {
    const updateIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + addition }
            const updatedIngredients = updateObject(state.ingredients, updateIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + (addition * INFGREDIENT_PRICES[action.ingredientName])
            }
            
            return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false
    });
};

const setIngredientsFail = (state, action) => {
    return updateObject(state, {
        error: true
    });
};

const burger = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return updateIngredient(state, action, 1);
        case actionTypes.REMOVE_INGREDIENT: return updateIngredient(state, action, -1);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.SET_INGREDIENTS_FAILED: return setIngredientsFail(state, action);
        default: return state;
    }
}

export default burger;