import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';

import { configureClient } from './api/client';
import storage from './utils/storage';
import './index.css';

import configureStore from './store/index';

const accessToken = storage.get('auth');
configureClient({ accessToken });

const store = configureStore({ preloadedState: { auth: !!accessToken } });

const render = () => {
  ReactDOM.render(<Root store={store} />, document.getElementById('root'));
};

render();
