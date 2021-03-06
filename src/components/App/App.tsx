import React, {useMemo} from 'react';
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
import {PaletteOptions} from "@material-ui/core/styles/createPalette";
import {useSelector} from "react-redux";
import {selectDarkMode} from "../../store/themeSlice";
import {createMuiTheme} from "@material-ui/core";
import {MuiThemeProvider} from "@material-ui/core/styles";

const lightPalette: PaletteOptions = {
  primary: {
    main: '#ff3d00',
  },
  secondary: {
    main: '#00B383',
    contrastText: '#fff'
  }
}

const darkPalette: PaletteOptions = {
  type: 'dark',
  primary: {
    main: '#B32A00',
  },
  secondary: {
    main: '#00B383',
    contrastText: '#fff'
  }
}

function App() {
  const darkMode = useSelector(selectDarkMode)
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: darkMode ? darkPalette : lightPalette
      }),
    [darkMode]
  )

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/">
            <MainLayout>
              <Route exact path="/">
                <PageProducts/>
              </Route>
              <Route exact path={["/admin/product-form/:id", '/admin/product-form']}>
                <PageProductForm/>
              </Route>
              <Route exact path="/cart">
                <PageCart/>
              </Route>
              <Route exact path="/admin/orders">
                <PageOrders/>
              </Route>
              <Route exact path="/admin/order/:id">
                <PageOrder/>
              </Route>
              <Route exact path="/admin/products">
                <PageProductImport/>
              </Route>
            </MainLayout>
          </Route>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
