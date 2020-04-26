import React from 'react';

import Aux from '../../../hoc/Auxilliary/Auxilliary'
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredients = props.ingredients || {};

    const ingredientSummary = Object.keys(ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            );
        }); 

    
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType='Danger' click={props.cancel}>CANCEL</Button>
            <Button btnType='Success' click={props.continue}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;