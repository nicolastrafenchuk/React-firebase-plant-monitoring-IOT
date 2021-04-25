import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  Fragment,
} from 'react';
import {
  FormControl,
  FormControlLabel,
  Divider,
  Button,
  Typography,
  Switch,
  TextField,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  InputAdornment,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AddAlert, Brightness6, Delete } from '@material-ui/icons';
import { format as formatDate } from 'date-fns';

import { FirebaseContext } from '../../context/Firebase';
import LocalNotification from '../LocalNotification';
import Loading from '../Loading';
import AddRuleModal from './AddRuleModal';

const useStyles = makeStyles((theme) => ({
  paper: { height: '100%', width: '100%', textAlign: 'center' },
  button: { margin: theme.spacing(2) },
  formControlContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    flexDirection: 'row',
    padding: '20px',
  },
  switchContainer: {
    padding: '20px 0',
    display: 'flex',
    justifyContent: 'center',
    placeItems: 'center',
  },
  lightRulesContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '20px 40px',
  },
  listContainer: {
    width: '400px',
    margin: '15px auto',
    backgroundColor: '#ecf70f',
  },
}));

const LightCard = () => {
  const [loading, setLoading] = useState(false);
  const [lightRules, setLightRules] = useState([]);
  const [autoLight, setAutoLight] = useState(false);
  const [criticalValue, setCriticalValue] = useState(0);
  const [addLightModalVisible, setAddLightModalVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const classes = useStyles();

  const {
    getRules,
    deleteRule,
    getAutoRule,
    updateAutoRule,
    updateCriticalValue,
  } = useContext(FirebaseContext);

  const onAddNewRuleClick = useCallback(() => {
    setAddLightModalVisible(true);
  }, []);

  const onAddNewRuleModalClose = useCallback(() => {
    setAddLightModalVisible(false);
  }, []);

  const onRuleDelete = useCallback(
    (id) => {
      setLoading(true);
      deleteRule(id, 'lightRules')
        .then(() => getRules('lightRules'))
        .then((data) => {
          setLightRules(data);
          setLoading(false);
        });
    },
    [deleteRule, getRules],
  );

  const getLightData = useCallback(
    () =>
      getRules('lightRules').then((data) => {
        setLightRules(data);
      }),
    [getRules],
  );

  const onAutoLightRuleChange = useCallback(
    (event) => {
      setAutoLight(event.target.checked);
      updateAutoRule(event.target.checked, 'light');
    },
    [updateAutoRule],
  );

  const onCriticalValueChange = useCallback((event) => {
    setCriticalValue(event.target.valueAsNumber);
  }, []);

  const onCriticalValueSave = useCallback(() => {
    updateCriticalValue(criticalValue, 'light').then(() => {
      setNotificationMessage('New critical lux value saved!');
    });
  }, [criticalValue, updateCriticalValue]);

  const onNotificationClose = useCallback(() => {
    setNotificationMessage('');
  }, []);

  useEffect(() => {
    setLoading(true);
    Promise.all([getRules('lightRules'), getAutoRule('light')]).then(
      ([lightRulesData, autoLightData]) => {
        setLightRules(lightRulesData);
        setAutoLight(autoLightData.enabled);
        setCriticalValue(autoLightData.criticalValue);
        setLoading(false);
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" style={{ padding: '25px 0' }}>
        LIGHT{' '}
        <span role="img" aria-label="sun">
          🌞
        </span>
      </Typography>
      <Divider />
      <FormControlLabel
        className={classes.switchContainer}
        labelPlacement="start"
        label={<Typography variant="h6">Automatic light</Typography>}
        value={autoLight}
        onChange={onAutoLightRuleChange}
        control={<Switch checked={autoLight} />}
      />
      <Divider />
      <FormControl fullWidth className={classes.formControlContainer}>
        <Typography variant="h6" style={{ paddingRight: '10px' }}>
          Set critical Lux:
        </Typography>
        <TextField
          value={criticalValue}
          className={classes.textField}
          helperText="From 0 to 100"
          onChange={onCriticalValueChange}
          disabled={!autoLight}
          inputProps={{
            type: 'number',
            min: 0,
            max: 100,
          }}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">% of Lux</InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={!autoLight}
          onClick={onCriticalValueSave}
        >
          Save
        </Button>
      </FormControl>
      <Divider />
      <FormControl fullWidth className={classes.lightRulesContainer}>
        <Typography variant="h5" display="inline">
          Light rules
        </Typography>
        {loading ? (
          <Loading />
        ) : (
          <List classes={{ root: classes.listContainer }}>
            {lightRules.map(({ from, to, id }, index) => {
              return (
                <Fragment key={id}>
                  <ListItem>
                    <ListItemIcon>
                      <Brightness6 />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography display="inline" variant="subtitle1">
                          Light on from:{' '}
                          <strong>{formatDate(from, 'HH:mm')}</strong> to:{' '}
                          <strong>{formatDate(to, 'HH:mm')}</strong>
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                          onRuleDelete(id);
                        }}
                      >
                        <Delete style={{ color: '#c20502' }} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index !== lightRules.length - 1 && (
                    // eslint-disable-next-line react/no-array-index-key
                    <Divider key={index} />
                  )}
                </Fragment>
              );
            })}
          </List>
        )}
        <span>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<AddAlert />}
            onClick={onAddNewRuleClick}
          >
            Add new rule
          </Button>
        </span>
      </FormControl>
      <AddRuleModal
        isOpen={addLightModalVisible}
        onSubmitCallback={getLightData}
        onClose={onAddNewRuleModalClose}
        title="Add new light rule"
        collectionName="lightRules"
      />
      <LocalNotification
        isOpen={Boolean(notificationMessage)}
        message={notificationMessage}
        onClose={onNotificationClose}
        severity="success"
      />
    </Paper>
  );
};

export default LightCard;
