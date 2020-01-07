//Startup point for the client side application
import 'babel-polyfill'; // <- fixes regenerator not defined problem.
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux' //provider communicate data from the store to any connected components in our app
import { renderRoutes } from 'react-router-config';
import Routes from './Routes';
import reducers from './reducers';

//a new redux store to use on the client side of our app.
const store = createStore(reducers, window.INITIAL_STATE, applyMiddleware(thunk)) // <-- read up on this.

//Provider gets store as props, provider listens to store.
ReactDOM.hydrate(
  <Provider store={store}> 
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);