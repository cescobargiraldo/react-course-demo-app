import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/checkout" component={Checkout}/>
              <Route path="/my-orders" component={Orders}/>
              <Route path="/" exact component={BurgerBuilder}/>
            </Switch>
          </Layout>
        </BrowserRouter>  
      </div>
    );
  }
}

export default App;
