import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'

import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

import burgerReducer from './store/reducers/burger'
import orderReducer from './store/reducers/order'
import authReducer from './store/reducers/auth'

import { watchAuth, watchBurger, watchOrder } from './store/sagas'

const composeEnhancers =
    process.env.NODE_ENV === 'development'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : null || compose

const rootReducer = combineReducers({
    burger: burgerReducer,
    order: orderReducer,
    auth: authReducer,
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)
))

sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchBurger)
sagaMiddleware.run(watchOrder)

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
