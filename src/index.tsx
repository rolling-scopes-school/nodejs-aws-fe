import React from "react";
import ReactDOM from "react-dom";
import "index.css";
import App from "components/App/App";
import { store } from "store/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import CssBaseline from "@material-ui/core/CssBaseline";
import { getIDToken } from "utils/utils";
import axios from "axios";

//TODO: refactor: 1) move IDs to env-vars, 2) move auth logic to authCongig.ts
const CLIENT_ID = "5l53ucrhna3tqbkle6vmne9ja6";
const DOMAIN = "https://metal-tickets-domain.auth.eu-west-1.amazoncognito.com";
const REDIRECT_URL = "https://d12t0bvcb8pyyn.cloudfront.net";
const loginPageUrl = `${DOMAIN}/login?client_id=${CLIENT_ID}&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${REDIRECT_URL}`;

const token = getIDToken();

if (!token) {
  window.location.replace(loginPageUrl);
}

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error?.response?.status === 400) {
      alert(error.response.data?.data);
    }

    if (error?.response?.status === 401 || error?.response?.status === 403) {
      alert(error.response.data?.message);
    }

    return Promise.reject(error?.response ?? error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
