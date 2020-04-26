import React from 'react'; 

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngedient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} /> 
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);
    
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    const burgerClasses = props.inList ? classes.FullWidthBurger : classes.Burger;

    return (
        <div className={burgerClasses}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;