import PageProducts from "~/components/pages/PageProducts/PageProducts";
import MainLayout from "~/components/MainLayout/MainLayout";
import { Routes, Route } from "react-router-dom";
import PageProductForm from "~/components/pages/PageProductForm/PageProductForm";
import PageCart from "~/components/pages/PageCart/PageCart";
import PageOrders from "~/components/pages/PageOrders/PageOrders";
import PageOrder from "~/components/pages/PageOrder/PageOrder";
import PageProductImport from "~/components/pages/admin/PageProductImport/PageProductImport";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<PageProducts />} />
        <Route path="cart" element={<PageCart />} />
        <Route path="admin">
          <Route path="orders" element={<PageOrders />} />
          <Route path="order/:id" element={<PageOrder />} />
          <Route path="products" element={<PageProductImport />} />
          <Route path="product-form" element={<PageProductForm />}>
            <Route path=":id" element={<PageProductForm />} />
          </Route>
        </Route>
      </Routes>
    </MainLayout>
  );
}

export default App;
