import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/base';
import configureStore from './redux/configureStore';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
