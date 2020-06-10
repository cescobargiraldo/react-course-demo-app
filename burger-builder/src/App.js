import React, { useEffect, Suspense } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout'
import Spinner from './components/UI/Spinner/Spinner'

import * as actions from './store/actions/index'

const Checkout = React.lazy(() => {
    return import('./containers/Checkout/Checkout')
})

const Orders = React.lazy(() => {
    return import('./containers/Orders/Orders')
})

const Auth = React.lazy(() => {
    return import('./containers/Auth/Auth')
})

const App = (props) => {
    const { onTryAutoSignUp } = props

    useEffect(() => {
        onTryAutoSignUp()
    }, [onTryAutoSignUp])

    
    let routes = (
        <Switch>
            <Route path="/auth" render={(props)=> <Auth {...props}/>} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
        </Switch>
    )

    if (props.isAuth) {
        routes = (
            <Switch>
                <Route path="/checkout" render={(props) => <Checkout {...props} />} />
                <Route path="/my-orders" render={(props) => <Orders {...props} />} />
                <Route path="/logout" component={Logout} />
                <Route path="/auth" render={(props) => <Auth {...props} />} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        )
    }

    return (
        <div>
            <BrowserRouter>
                <Layout>
                    <Suspense fallback={<Spinner />}>
                        {routes}
                    </Suspense>
                </Layout>
            </BrowserRouter>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.token !== null,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheckState()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
