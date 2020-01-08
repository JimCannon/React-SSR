//Startup point for the client side application
import 'babel-polyfill'; // <- fixes regenerator not defined problem.
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux' //provider communicate data from the store to any connected components in our app
import { renderRoutes } from 'react-router-config';
import axios from 'axios';
import Routes from './Routes';
import reducers from './reducers';

const axiosInstance = axios.create({
  baseURL: '/api'
});

// <-- read up on this.
//a new redux store to use on the client side of our app.
const store = createStore(
  reducers, 
  window.INITIAL_STATE, 
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
); 

//Provider gets store as props, provider listens to store.
ReactDOM.hydrate(
  <Provider store={store}> 
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);