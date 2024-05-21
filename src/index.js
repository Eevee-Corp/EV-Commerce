import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App.jsx';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import './App.scss';
import { store } from './redux/store'
  //will need to import once created

const root = createRoot(document.getElementById('app'));
root.render(
  // wrap the App in the Provider Component and pass in the store
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);