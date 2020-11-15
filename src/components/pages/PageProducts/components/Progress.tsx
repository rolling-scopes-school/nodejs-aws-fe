import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStylesFacebook = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  top: {
    color: '#1a90ff',
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
  circle: {
    strokeLinecap: 'round',
  },
  wrapper: {
    height: 'calc(100vh - 200px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const Propgress = () => {
  const classes = useStylesFacebook();

  return (
    <div className={classes.wrapper}>
      <div className={classes.root}>
        <CircularProgress
          variant="determinate"
          className={classes.bottom}
          size={40}
          thickness={4}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          className={classes.top}
          classes={{
            circle: classes.circle,
          }}
          size={40}
          thickness={4}
        />
      </div>
    </div>
  );
};

export default Propgress;
