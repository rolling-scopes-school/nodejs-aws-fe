import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'components/App/App.css';
import PageProducts from 'components/pages/PageProducts/PageProducts';
import MainLayout from 'components/MainLayout/MainLayout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageProductForm from 'components/pages/PageProductForm/PageProductForm';
import PageCart from 'components/pages/PageCart/PageCart';
import PageOrders from 'components/pages/PageOrders/PageOrders';
import PageOrder from 'components/pages/PageOrder/PageOrder';
import PageProductImport from 'components/pages/admin/PageProductImport/PageProductImport';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function App() {
  const [error, setError] = useState<string | null>();
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    axios.interceptors.response.use(
      response => {
        return response;
      },
      function (error) {
        console.log('hey');
        if (error?.response?.status === 400) {
          alert(error.response.data?.data);
        }

        if (error?.response?.status === 401) {
          setError('Unauthorized');
          setShowError(true);
        }

        if (error?.response?.status === 403) {
          setError('Access denied');
          setShowError(true);
        }
        if (error?.response?.status === 500) {
          setError('Something went wrong');
          setShowError(true);
        }
        if (error?.response?.status === 502) {
          setError('Something went wrong');
          setShowError(true);
        }

        return Promise.reject(error?.response ?? error);
      },
    );
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/">
          <MainLayout>
            <Route exact path="/">
              <PageProducts />
            </Route>
            <Route exact path={['/admin/product-form/:id', '/admin/product-form']}>
              <PageProductForm />
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
        </Route>
      </Switch>
      <Snackbar open={showError} autoHideDuration={3000} onClose={() => setShowError(false)}>
        <MuiAlert elevation={6} variant="filled" severity="error">
          {error}
        </MuiAlert>
      </Snackbar>
    </Router>
  );
}

export default App;
