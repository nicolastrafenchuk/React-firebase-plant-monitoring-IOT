/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import DateFnsUtils from '@date-io/date-fns';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
  paper: { height: '100%', width: '100%', textAlign: 'center' },
  control: { padding: theme.spacing(2) },
  button: { margin: theme.spacing(2) },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function Control() {
  // const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: true,
    selectedDate: new Date(),
  });

  const handleDateChange = (date) => {
    setState({ selectedDateStart: date });
  };

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.checked });
  };

  const { selectedDate } = state;

  return (
    <Grid
      container
      className={classes.root}
      justify="space-around"
      alignItems="stretch"
    >
      {' '}
      <Grid item xs={10}>
        {' '}
        <Grid container spacing={3}>
          {' '}
          <Grid item xs={6}>
            {' '}
            <Typography variant="h5">
              <Paper className={classes.paper}>
                {' '}
                <p style={{ paddingTop: 25 }}>
                  <Typography variant="h4">
                    WATERING{' '}
                    <span role="img" aria-label="water">
                      💦
                    </span>
                  </Typography>
                </p>{' '}
                <Divider />{' '}
                <FormControl component="fieldset" fullWidth="true">
                  {' '}
                  <FormGroup>
                    {' '}
                    <Typography variant="h6">
                      {' '}
                      Automatic watering{' '}
                      <FormControlLabel
                        disabled="true"
                        labelPlacement="start"
                        control={
                          <div>
                            {' '}
                            <Switch
                              checked={state.gilad}
                              onChange={handleChange('gilad')}
                              value="gilad"
                            />{' '}
                          </div>
                        }
                        label=""
                        style={{ paddingTop: 20, paddingBottom: 20 }}
                      />{' '}
                    </Typography>{' '}
                    <Typography variant="h6">
                      {' '}
                      Set critical RH:{' '}
                      <FormControlLabel
                        labelPlacement="start"
                        control={
                          <div>
                            {' '}
                            <TextField
                              label="Rh"
                              id="margin-none"
                              defaultValue="0"
                              className={classes.textField}
                              helperText="From 0 to 100 %"
                            />{' '}
                            <Button
                              variant="outlined"
                              color="inerhit"
                              className={classes.button}
                            >
                              {' '}
                              Set{' '}
                            </Button>{' '}
                          </div>
                        }
                        label=""
                        style={{ paddingTop: 20, paddingBottom: 20 }}
                      />{' '}
                    </Typography>{' '}
                    <Divider />{' '}
                    <Typography variant="h5" display="inline">
                      {' '}
                      Watering rules{' '}
                    </Typography>{' '}
                    <FormControlLabel
                      labelPlacement="start"
                      control={
                        <div>
                          {' '}
                          <Typography display="inline" variant="subtitle1">
                            {' '}
                            Watering{' '}
                          </Typography>{' '}
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Typography display="inline" variant="subtitle1">
                              from:
                            </Typography>{' '}
                            <TimePicker
                              color="inherit"
                              ampm={false}
                              showTodayButton
                              value={selectedDate}
                              onChange={handleDateChange}
                              style={{ marginLeft: 10, marginRight: 10 }}
                            />{' '}
                            <Typography display="inline" variant="subtitle1">
                              to:
                            </Typography>{' '}
                            <TimePicker
                              color="inherit"
                              ampm={false}
                              showTodayButton
                              value={selectedDate}
                              onChange={handleDateChange}
                              style={{ marginLeft: 10, marginRight: 25 }}
                            />{' '}
                          </MuiPickersUtilsProvider>{' '}
                        </div>
                      }
                    />{' '}
                    <Button
                      variant="outlined"
                      color="inerhit"
                      className={classes.button}
                    >
                      {' '}
                      Add new rule{' '}
                    </Button>{' '}
                  </FormGroup>{' '}
                </FormControl>{' '}
              </Paper>{' '}
            </Typography>{' '}
          </Grid>{' '}
          <Grid item xs={6}>
            {' '}
            <Typography variant="h5">
              {' '}
              <Paper className={classes.paper}>
                {' '}
                <p style={{ paddingTop: 25 }}>
                  <Typography variant="h4">
                    LIGHT{' '}
                    <span role="img" aria-label="sun">
                      🌞
                    </span>
                  </Typography>
                </p>{' '}
                <Divider />{' '}
                <FormControl component="fieldset" fullWidth="true">
                  {' '}
                  <FormGroup>
                    {' '}
                    <Typography variant="h6">
                      {' '}
                      Automatic light{' '}
                      <FormControlLabel
                        disabled="true"
                        labelPlacement="start"
                        control={
                          <div>
                            {' '}
                            <Switch
                              checked={state.gilad}
                              onChange={handleChange('gilad')}
                              value="gilad"
                            />{' '}
                          </div>
                        }
                        label=""
                        style={{ paddingTop: 20, paddingBottom: 20 }}
                      />{' '}
                    </Typography>{' '}
                    <Typography variant="h6">
                      {' '}
                      Set critical lux:{' '}
                      <FormControlLabel
                        labelPlacement="start"
                        control={
                          <div>
                            {' '}
                            <TextField
                              label="Lx"
                              id="margin-none"
                              defaultValue="0"
                              className={classes.textField}
                              helperText="From 0 to 100 %"
                            />
                            <Button
                              variant="outlined"
                              color="inerhit"
                              className={classes.button}
                            >
                              {' '}
                              Set{' '}
                            </Button>{' '}
                          </div>
                        }
                        label=""
                        style={{ paddingTop: 20, paddingBottom: 20 }}
                      />{' '}
                    </Typography>{' '}
                    <Divider />{' '}
                    <Typography variant="h5" display="inline">
                      {' '}
                      Light rules{' '}
                    </Typography>{' '}
                    <FormControlLabel
                      labelPlacement="start"
                      control={
                        <div>
                          {' '}
                          <Typography display="inline" variant="subtitle1">
                            {' '}
                            Light{' '}
                          </Typography>{' '}
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            {' '}
                            <Typography display="inline" variant="subtitle1">
                              from:
                            </Typography>{' '}
                            <TimePicker
                              color="inherit"
                              ampm={false}
                              showTodayButton
                              value={selectedDate}
                              onChange={handleDateChange}
                              style={{ marginLeft: 10, marginRight: 10 }}
                            />{' '}
                            <Typography display="inline" variant="subtitle1">
                              to:
                            </Typography>{' '}
                            <TimePicker
                              color="inherit"
                              ampm={false}
                              showTodayButton
                              value={selectedDate}
                              onChange={handleDateChange}
                              style={{ marginLeft: 10, marginRight: 25 }}
                            />{' '}
                          </MuiPickersUtilsProvider>{' '}
                        </div>
                      }
                    />{' '}
                    <Button
                      variant="outlined"
                      color="inerhit"
                      className={classes.button}
                    >
                      {' '}
                      Add new rule{' '}
                    </Button>{' '}
                  </FormGroup>{' '}
                </FormControl>{' '}
              </Paper>{' '}
            </Typography>{' '}
          </Grid>{' '}
        </Grid>{' '}
      </Grid>{' '}
    </Grid>
  );
}

export default Control;
