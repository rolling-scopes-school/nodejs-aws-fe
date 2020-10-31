import React from 'react';
import 'components/App/App.css';
import PageProducts from "components/pages/PageProducts/PageProducts";
import MainLayout from "components/MainLayout/MainLayout";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PageProductForm from "components/pages/PageProductForm/PageProductForm";
import PageCart from "components/pages/PageCart/PageCart";
import PageOrders from "components/pages/PageOrders/PageOrders";
import PageOrder from "components/pages/PageOrder/PageOrder";
import PageProductImport from "components/pages/admin/PageProductImport/PageProductImport";
import { ThemeProvider } from '@material-ui/core';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { red, teal } from '@material-ui/core/colors';

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: teal[400],
      },
      secondary: {
        main: red[400],
      },
    },
  });

  return (
    <Router>
      <Switch>
        <Route path="/">
          <ThemeProvider theme={theme}>
            <MainLayout>
              <Route exact path="/">
                <PageProducts/>
              </Route>
              <Route exact path={["/admin/product-form/:id", '/admin/product-form']}>
                <PageProductForm/>
              </Route>
              <Route exact path="/cart">
                <PageCart />
              </Route>
              <Route exact path="/admin/orders">
                <PageOrders />
              </Route>
              <Route exact path="/admin/order/:id">
                <PageOrder />
              </Route>
              <Route exact path="/admin/products">
                <PageProductImport />
              </Route>
            </MainLayout>
          </ThemeProvider>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
