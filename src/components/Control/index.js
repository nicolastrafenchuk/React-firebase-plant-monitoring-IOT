import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormControlLabel, Paper } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { TimePicker } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1, marginTop: '0' },
  paper: { height: '100%', width: '100%', textAlign: 'center' },
  control: { padding: theme.spacing(2) },
  button: { margin: theme.spacing(2) },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const Control = () => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    gilad: true,
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
    <Grid container className={classes.root} justify="center" spacing={6}>
      <Grid item xs={4}>
        <Typography variant="h5">
          <Paper className={classes.paper}>
            <Typography variant="h4" style={{ padding: '25px 0' }}>
              WATERING
              <span role="img" aria-label="water">
                💦
              </span>
            </Typography>
            <Divider />
            <FormControl component="fieldset" fullWidth>
              <FormGroup>
                <div
                  style={{
                    padding: '20px 0',
                    display: 'flex',
                    justifyContent: 'center',
                    placeItems: 'center',
                  }}
                >
                  <Typography variant="h6">Automatic watering</Typography>
                  <Switch
                    checked={state.gilad}
                    onChange={handleChange('gilad')}
                    value="gilad"
                  />
                </div>
                <Typography variant="h6">
                  Set critical RH:
                  <FormControlLabel
                    labelPlacement="start"
                    control={
                      <div>
                        <TextField
                          label="Rh"
                          defaultValue="0"
                          className={classes.textField}
                          helperText="From 0 to 100 %"
                        />
                        <Button
                          variant="outlined"
                          color="inherit"
                          className={classes.button}
                        >
                          Set
                        </Button>
                      </div>
                    }
                    label=""
                    style={{ paddingTop: 20, paddingBottom: 20 }}
                  />
                </Typography>
                <Divider />
                <Typography variant="h5" display="inline">
                  Watering rules
                </Typography>
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <div>
                      <Typography display="inline" variant="subtitle1">
                        Watering
                      </Typography>
                      <Typography display="inline" variant="subtitle1">
                        from:
                      </Typography>
                      <TimePicker
                        ampm={false}
                        showTodayButton
                        value={selectedDate}
                        onChange={handleDateChange}
                        style={{ marginLeft: 10, marginRight: 10 }}
                      />
                      <Typography display="inline" variant="subtitle1">
                        to:
                      </Typography>
                      <TimePicker
                        ampm={false}
                        showTodayButton
                        value={selectedDate}
                        onChange={handleDateChange}
                        style={{ marginLeft: 10, marginRight: 25 }}
                      />
                    </div>
                  }
                />
                <Button
                  variant="outlined"
                  color="inherit"
                  className={classes.button}
                >
                  Add new rule
                </Button>
              </FormGroup>
            </FormControl>
          </Paper>
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h5">
          <Paper className={classes.paper}>
            <Typography variant="h4" style={{ padding: '25px 0' }}>
              LIGHT
              <span role="img" aria-label="sun">
                🌞
              </span>
            </Typography>
            <Divider />
            <FormControl component="fieldset" fullWidth>
              <FormGroup>
                <div
                  style={{
                    padding: '20px 0',
                    display: 'flex',
                    justifyContent: 'center',
                    placeItems: 'center',
                  }}
                >
                  <Typography variant="h6">Automatic light</Typography>
                  <Switch
                    checked={state.gilad}
                    onChange={handleChange('gilad')}
                    value="gilad"
                  />
                </div>
                <Typography variant="h6">
                  Set critical lux:
                  <FormControlLabel
                    labelPlacement="start"
                    control={
                      <div>
                        <TextField
                          label="Lx"
                          defaultValue="0"
                          className={classes.textField}
                          helperText="From 0 to 100 %"
                        />
                        <Button
                          variant="outlined"
                          color="inherit"
                          className={classes.button}
                        >
                          Set
                        </Button>
                      </div>
                    }
                    label=""
                    style={{ paddingTop: 20, paddingBottom: 20 }}
                  />
                </Typography>
                <Divider />
                <Typography variant="h5" display="inline">
                  Light rules
                </Typography>
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <div>
                      <Typography display="inline" variant="subtitle1">
                        Light
                      </Typography>
                      <Typography display="inline" variant="subtitle1">
                        from:
                      </Typography>
                      <TimePicker
                        ampm={false}
                        showTodayButton
                        value={selectedDate}
                        onChange={handleDateChange}
                        style={{ marginLeft: 10, marginRight: 10 }}
                      />
                      <Typography display="inline" variant="subtitle1">
                        to:
                      </Typography>
                      <TimePicker
                        ampm={false}
                        showTodayButton
                        value={selectedDate}
                        onChange={handleDateChange}
                        style={{ marginLeft: 10, marginRight: 25 }}
                      />
                    </div>
                  }
                />
                <Button
                  variant="outlined"
                  color="inherit"
                  className={classes.button}
                >
                  Add new rule
                </Button>
              </FormGroup>
            </FormControl>
          </Paper>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Control;
