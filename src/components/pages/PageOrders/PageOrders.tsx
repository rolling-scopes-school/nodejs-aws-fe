import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Orders from "components/pages/PageOrders/components/Orders";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3, 0, 3),
  },
}));

export default function PageOrders() {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Typography variant="h6" gutterBottom>
        Manage orders
      </Typography>
      <Orders/>
    </div>
  );
}
