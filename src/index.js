import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/common.scss';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import { store } from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.interceptors.request.use((config) => {
  const token = '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';
  config.headers.Authorization = `Bearer ${token} `;
  return config;
});
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
);
