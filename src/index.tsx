import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import App from 'components/App/App';
import {store} from 'store/store';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from 'axios';

axios.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    if (error.response.status === 400) {
      alert("status code 400, message: " + error.response.data?.data);
    }

    if (error.response.status === 401) {
      alert("status code 401, message: " + error.response.data?.message);
    }

    if (error.response.status === 403) {
      alert("status code 403, message: " + error.response.data?.message);
    }

    if (error.response.status === 500) {
      alert("status code 500, message: " + error.response.data?.message);
    }

    return Promise.reject(error.response);
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
