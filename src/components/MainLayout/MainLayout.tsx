import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Container from "@material-ui/core/Container";
import Header from "components/MainLayout/components/Header";
import {createMuiTheme} from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        My Store
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: theme.spacing(8),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff3d00',
    },
    secondary: {
      main: '#00B383',
      contrastText: '#fff'
    }
  }
})

const MainLayout: React.FC = ({children}) => {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <Header/>
      <main>
        <Container className={classes.container} maxWidth="md">
          {children!}
        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Thank you for your purchase!
        </Typography>
        <Copyright/>
      </footer>
    </MuiThemeProvider>
  );
};

export default MainLayout;
