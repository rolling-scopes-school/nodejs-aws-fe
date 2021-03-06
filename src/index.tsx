import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import App from 'components/App/App';
import { store } from 'store/store';

import * as serviceWorker from './serviceWorker';

import 'index.css';

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 400) {
            // eslint-disable-next-line no-alert
            alert(error.response.data?.data);
        }

        return Promise.reject(error.response);
    },
);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={ store }>
            <CssBaseline />
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
