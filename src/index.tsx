import React from "react";
import ReactDOM from "react-dom";
import App from "~/components/App/App";
import { store } from "~/store/store";
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";

const theme = createTheme();

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
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
