import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {

    return (
        <ul className={classes.NavigatonItems}>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            <NavigationItem link="/my-orders">My Orders</NavigationItem>
        </ul>
    )
}

export default navigationItems;