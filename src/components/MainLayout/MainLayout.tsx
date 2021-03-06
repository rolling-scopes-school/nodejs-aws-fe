import React, {useMemo} from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Container from "@material-ui/core/Container";
import Header from "components/MainLayout/components/Header";
import {colors, createMuiTheme} from "@material-ui/core";
import {PaletteOptions} from "@material-ui/core/styles/createPalette";
import {useSelector} from "react-redux";
import {selectDarkMode} from "../../store/themeSlice";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        E-Games
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(({spacing, palette: {type, background}}) => ({
  main: {
    backgroundColor: type === 'dark' ? colors.grey[900] : colors.grey[200]
  },
  container: {
    paddingBottom: spacing(8),
  },
  footer: {
    backgroundColor: type === 'dark' ? colors.grey[800] : background.paper,
    padding: spacing(6),
  }
}));

const MainLayout: React.FC = ({children}) => {
  const classes = useStyles();

  return (
    <>
      <Header/>
      <main className={classes.main}>
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
    </>
  );
};

export default MainLayout;
