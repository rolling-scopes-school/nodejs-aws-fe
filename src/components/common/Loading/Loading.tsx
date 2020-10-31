import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  loading: {
    margin: theme.spacing(3, 'auto', 3)
  },
}));

const Loading:React.FC = () =>  {
  const classes = useStyles();
  return (
    <div className={classes.loading}>
      Loading...
    </div>
  );
};

export default Loading;