import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Products from "components/pages/PageProducts/components/Products";

const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3, 0, 3),
  },
}));

export default function PageProducts() {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <h1>DEPLOYED VIA SERVERLESS-FINCH</h1>
      <Products/>
    </div>
  );
}