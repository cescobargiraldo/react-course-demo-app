import React, {Fragment} from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {

    return (
        <ul className={classes.NavigatonItems}>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            {props.isAuthenticated 
                ? (
                    <Fragment>
                        <NavigationItem link="/my-orders">My Orders</NavigationItem>
                        <NavigationItem link="/logout">Logout</NavigationItem>
                    </Fragment>
                )
                : <NavigationItem link="/auth">Authenticate</NavigationItem>
            }
            
            
        </ul>
    )
}

export default navigationItems;