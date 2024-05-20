import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import './App.scss';
import { store } from './store'  //will need to import once created

const root = createRoot(document.getElementById('app'));
root.render(
  // wrap the App in the Provider Component and pass in the store
  <Provider store={store}>
      <App />
  </Provider>
)