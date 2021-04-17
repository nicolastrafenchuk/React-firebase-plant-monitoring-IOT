import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const FullScreenLoading = ({ isLoading }) => {
  const classes = useStyles();

  return isLoading ? (
    <div className={classes.root}>
      <CircularProgress size={100} />
    </div>
  ) : null;
};

export default FullScreenLoading;
