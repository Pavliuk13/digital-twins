import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '@@store/index';
import { useAuth } from '@@hooks/auth/useAuth';
import { selectUser } from '@@store/user/selectors';

import Splash from '@@components/common/Splash';

import App from './App.tsx';

import '@@styles/index.scss';

function Root() {
  const { isLoadingUser } = useSelector(selectUser);

  useAuth();

  return isLoadingUser ? <Splash /> : <App />;
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </Provider>,
);
