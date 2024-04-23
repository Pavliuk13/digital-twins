import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '@@store/index';

import App from './App.tsx';

import '@@styles/index.scss';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
