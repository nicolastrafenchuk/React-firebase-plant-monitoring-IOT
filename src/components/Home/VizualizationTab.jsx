import React, { useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Paper, Grid, Typography, Divider, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { patternLinesDef } from '@nivo/core';
import { ResponsiveLine } from '@nivo/line';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { formatDistance, format as formatDate } from 'date-fns';
import cslx from 'clsx';

import Loading from '../Loading';
import StatisticItem from './StatisticItem';
import calculateTickValues from './utils';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
  text: {
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '100%',
  },
  valueLabel: {
    width: '45%',
  },
  statisticItemContainer: { height: '90%', width: '55%' },
  header: {
    paddingBottom: '16px',
  },
  periodContaier: {
    paddingTop: 20,
    paddingBottom: 20,
    margin: '20px 0',
    textAlign: 'center',
  },
  footer: {
    paddingTop: '16px',
  },
}));

const VizualizationTab = ({
  data,
  label,
  colorScheme,
  loading,
  handleDateFromChange,
  handleDateToChange,
  getPeriodData,
  dateTo,
  dateFrom,
}) => {
  const classes = useStyles();

  const minYValue = useMemo(() => {
    return Math.min(...data.map(({ y }) => Number(y)));
  }, [data]);

  const maxYValue = useMemo(() => {
    return Math.max(...data.map(({ y }) => Number(y)));
  }, [data]);

  const average = useMemo(() => {
    return (data.reduce((a, { y }) => a + Number(y), 0) / data.length).toFixed(
      4,
    );
  }, [data]);

  const maxDiffrence = useMemo(() => {
    return data
      .reduce((acc, { y }, index) => {
        if (index === 0) {
          return 0;
        }
        if (Math.abs(Number(data[index - 1].y) - Number(y)) > acc) {
          return Math.abs(Number(data[index - 1].y) - Number(y));
        }
        return acc;
      }, 0)
      .toFixed(1);
  }, [data]);

  useEffect(() => {
    if (data?.length) {
      handleDateFromChange(new Date(data[0].x));
      handleDateToChange(new Date(data[data.length - 1].x));
    }
  }, [data, handleDateFromChange, handleDateToChange]);

  const renderTooltip = useCallback(({ slice }) => {
    return (
      <div
        style={{
          background: 'white',
          padding: '9px 12px',
          border: '1px solid #ccc',
        }}
      >
        {slice.points.map((point) => (
          <div
            key={point.id}
            style={{
              padding: '3px 0',
            }}
          >
            <div
              style={{
                color: point.serieColor,
              }}
            >
              <strong>{point.serieId}: </strong>
              {point.data.yFormatted}
            </div>
            <div>
              <strong>Time: </strong>
              {formatDate(point.data.x, 'HH:mm:ss dd/LL/y')}
            </div>
          </div>
        ))}
      </div>
    );
  }, []);

  return (
    <Paper style={{ height: 'calc(100vh - 248px)', margin: 20 }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Grid container className={classes.root}>
            <Grid item xs={10}>
              <div style={{ height: 'calc(100vh - 252px)' }}>
                <ResponsiveLine
                  data={[
                    {
                      id: label,
                      data,
                    },
                  ]}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 65,
                    left: 55,
                  }}
                  xScale={{
                    type: 'time',
                    format: '%Y-%m-%dT%H:%M:%S.%LZ',
                    precision: 'second',
                  }}
                  xFormat="time:%Y-%m-%dT%H:%M:%S.%LZ"
                  yScale={{
                    type: 'linear',
                    stacked: false,
                    min: 'auto',
                    max: 'auto',
                  }}
                  axisBottom={{
                    tickValues: calculateTickValues(data.length),
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -45,
                    format: '%H:%M:%S',
                  }}
                  curve="monotoneX"
                  colors={{
                    scheme: colorScheme,
                  }}
                  enableArea
                  areaBaselineValue={minYValue}
                  areaOpacity={0.1}
                  lineWidth={5}
                  enablePoints
                  pointSize={15}
                  enableSlices="x"
                  animate
                  theme={{
                    fontSize: 14,
                  }}
                  defs={[
                    patternLinesDef('lines-pattern', {
                      color: 'inherit',
                      spacing: 4,
                      rotation: -45,
                      lineWidth: 3,
                    }),
                  ]}
                  fill={[{ match: { id: label }, id: 'lines-pattern' }]}
                  sliceTooltip={renderTooltip}
                />
              </div>
            </Grid>
            <Grid item xs={2}>
              <Grid
                container
                direction="column"
                justify="center"
                className={classes.root}
              >
                {data.length && (
                  <Grid
                    item
                    xs={1}
                    className={cslx(classes.text, classes.header)}
                  >
                    <Typography variant="h5">{label} statistics</Typography>
                    <Typography variant="h5">
                      for last{' '}
                      {formatDistance(
                        new Date(data[data.length - 1].x),
                        new Date(data[0].x),
                      )}
                    </Typography>
                  </Grid>
                )}
                <Divider />
                <Grid item xs={2} className={classes.info}>
                  <div className={classes.statisticItemContainer}>
                    <StatisticItem colorScheme="pastel1" value={maxYValue} />
                  </div>
                  <div className={classes.valueLabel}>
                    <Typography variant="h6">Maximum</Typography>
                  </div>
                </Grid>
                <Grid item xs={2} className={classes.info}>
                  <div className={classes.valueLabel}>
                    <Typography variant="h6" style={{ textAlign: 'end' }}>
                      Average
                    </Typography>
                  </div>
                  <div className={classes.statisticItemContainer}>
                    <StatisticItem colorScheme="paired" value={average} />
                  </div>
                </Grid>
                <Grid item xs={2} className={classes.info}>
                  <div className={classes.statisticItemContainer}>
                    <StatisticItem colorScheme="pastel2" value={minYValue} />
                  </div>
                  <div className={classes.valueLabel}>
                    <Typography variant="h6">Minimum</Typography>
                  </div>
                </Grid>
                {data.length > 2 && (
                  <>
                    <Divider />
                    <Grid
                      item
                      xs={1}
                      className={cslx(classes.text, classes.footer)}
                    >
                      <Typography variant="h6">
                        Max difference beetwen two closest values:
                      </Typography>
                      <Typography variant="h5">{maxDiffrence}</Typography>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Paper className={classes.periodContaier}>
            <Typography display="inline" variant="subtitle1">
              Now showing period{' '}
            </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Typography display="inline" variant="subtitle1">
                from:
              </Typography>
              <DateTimePicker
                ampm={false}
                showTodayButton
                value={dateFrom}
                onChange={handleDateFromChange}
                style={{ marginLeft: 15, marginRight: 15 }}
              />
              <Typography display="inline" variant="subtitle1">
                to:
              </Typography>
              <DateTimePicker
                ampm={false}
                showTodayButton
                value={dateTo}
                onChange={handleDateToChange}
                style={{ marginLeft: 15, marginRight: 15 }}
              />
            </MuiPickersUtilsProvider>
            <Button onClick={getPeriodData}>Set period</Button>
          </Paper>
        </>
      )}
    </Paper>
  );
};

export default VizualizationTab;

VizualizationTab.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.string.isRequired,
      y: PropTypes.string.isRequired,
    }),
  ).isRequired,
  label: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  dateTo: PropTypes.instanceOf(Date).isRequired,
  dateFrom: PropTypes.instanceOf(Date).isRequired,
  handleDateFromChange: PropTypes.func.isRequired,
  handleDateToChange: PropTypes.func.isRequired,
  getPeriodData: PropTypes.func.isRequired,
};
