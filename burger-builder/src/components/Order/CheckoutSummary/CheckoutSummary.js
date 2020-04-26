import React from 'react';

import classes from './CheckoutSummary.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {

    return (
        <div className={classes.CheckoutSummary}>
            <h1>I hope it tates well!</h1>
            <div style={{
                width: '100%',
                margin: 'auto'
            }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button 
                btnType="Danger"
                click={props.cancel}>CANCEL</Button>
            <Button 
                btnType="Success"
                click={props.confirm}>CUNTINUE</Button>
        </div>
    );
}

export default checkoutSummary;