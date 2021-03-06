import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import MainLayout from 'components/MainLayout/MainLayout';
import PageProductImport from 'components/pages/admin/PageProductImport/PageProductImport';
import PageCart from 'components/pages/PageCart/PageCart';
import PageOrder from 'components/pages/PageOrder/PageOrder';
import PageOrders from 'components/pages/PageOrders/PageOrders';
import PageProductForm from 'components/pages/PageProductForm/PageProductForm';
import PageProducts from 'components/pages/PageProducts/PageProducts';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <MainLayout>
                        <Route exact={ true } path="/">
                            <PageProducts />
                        </Route>
                        <Route exact={ true } path={ ['/admin/product-form/:id', '/admin/product-form'] }>
                            <PageProductForm />
                        </Route>
                        <Route exact={ true } path="/cart">
                            <PageCart />
                        </Route>
                        <Route exact={ true } path="/admin/orders">
                            <PageOrders />
                        </Route>
                        <Route exact={ true } path="/admin/order/:id">
                            <PageOrder />
                        </Route>
                        <Route exact={ true } path="/admin/products">
                            <PageProductImport />
                        </Route>
                    </MainLayout>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
