import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "~/components/App/App";
import { store } from "~/store/store";
import { Provider } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error?.response?.status === 400) {
      alert(error.response.data?.data);
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
