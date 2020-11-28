import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import App from 'components/App/App';
import {store} from 'store/store';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from 'axios';

const responseStatusesToAlert = new Set([400, 401, 403]);

axios.interceptors.response.use(
  response => {
    return response;
  },
  function({ response }) {
    const errorMessage = response.data?.message || response.data;
    const { status } = response;
    if (responseStatusesToAlert.has(status)) {
      alert(errorMessage);
    }
    return Promise.reject(response);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline/>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
