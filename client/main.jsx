import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { connect, Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'

import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import rootReducer from './reducers/rootReducer'
import rootsaga  from './sagas/rootSaga'

import HomePage from './components/homePage.jsx'
import ResultPage from './components/resultPage.jsx'
import Map from './components/mapPage.jsx'


const sagaMiddleware = createSagaMiddleware();

// Setup redux dev tools
const composeSetup = process.env.NODE_ENV !== 'prod' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

const store = createStore(
  rootReducer,
  composeSetup(
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(rootsaga);

export const browserHistory = createBrowserHistory({});

ReactDOM.render(
  <Provider store = {store}>
    <Router history={browserHistory}>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/map" component={Map} />
            <Route path="/address/:address" component={ResultPage} />
        </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
);

