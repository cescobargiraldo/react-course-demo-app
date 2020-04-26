import React from 'react';

import classes from './Order.css';

import Burger from '../Burger/Burger';

const order = (props) => {
    return (
        <div className={classes.Order}>
            <h4>Your Burger</h4>
            <div className={classes.BurgerContainer}>
                <Burger inList ingredients={props.order.ingredients} />
            </div>
            <p>
                You payed
                <br/> 
                <strong>${props.order.price.toFixed(2)}</strong>
            </p>
        </div>
    );
}

export default order;