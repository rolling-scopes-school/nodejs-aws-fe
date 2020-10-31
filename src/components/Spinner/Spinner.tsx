import React, { FC } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  root: {
    color: 'lightblue',
  },
});

export const Spinner: FC = () => {
  const { wrapper, root } = useStyles();

  return (
    <div className={wrapper}>
      <CircularProgress className={root} size={60} />
    </div>
  );
};
