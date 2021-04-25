import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import WateringCard from './WateringCard';
import LightCard from './LightCard';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginTop: '0',
    height: 'calc(100vh - 64px)',
  },
  gridContainer: {
    padding: '0 24px',
  },
}));

const Control = () => {
  const classes = useStyles();

  return (
    <div className={classes.gridContainer}>
      <Grid
        container
        className={classes.root}
        direction="row"
        alignItems="center"
        justify="center"
        spacing={6}
      >
        <Grid item xs={4}>
          <WateringCard />
        </Grid>
        <Grid item xs={4}>
          <LightCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default Control;
