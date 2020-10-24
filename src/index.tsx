import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import App from 'components/App/App';
import {store} from 'store/store';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { orange, red } from '@material-ui/core/colors';
import axios from 'axios';

const theme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: red,
  },
});

axios.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    if (error.response.status === 400) {
      alert(error.response.data?.data);
    }
    return Promise.reject(error.response);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline/>
        <App/>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
