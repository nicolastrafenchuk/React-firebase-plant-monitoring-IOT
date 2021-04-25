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
import { AddAlert, InvertColors, Delete } from '@material-ui/icons';
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
  wateringRulesContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '20px 40px',
  },
  listContainer: {
    width: '400px',
    margin: '15px auto',
    backgroundColor: '#b0f6fe',
  },
}));

const WateringCard = () => {
  const [loading, setLoading] = useState(false);
  const [wateringRules, setWateringRules] = useState([]);
  const [autoWatering, setAutoWatering] = useState(false);
  const [criticalValue, setCriticalValue] = useState(0);
  const [addWateringModalVisible, setAddWateringModalVisible] = useState(false);
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
    setAddWateringModalVisible(true);
  }, []);

  const onAddNewRuleModalClose = useCallback(() => {
    setAddWateringModalVisible(false);
  }, []);

  const onRuleDelete = useCallback(
    (id) => {
      setLoading(true);
      deleteRule(id, 'wateringRules')
        .then(() => getRules('wateringRules'))
        .then((data) => {
          setWateringRules(data);
          setLoading(false);
        });
    },
    [deleteRule, getRules],
  );

  const getWateringData = useCallback(
    () =>
      getRules('wateringRules').then((data) => {
        setWateringRules(data);
      }),
    [getRules],
  );

  const onAutoWateringRuleChange = useCallback(
    (event) => {
      setAutoWatering(event.target.checked);
      updateAutoRule(event.target.checked, 'watering');
    },
    [updateAutoRule],
  );

  const onCriticalValueChange = useCallback((event) => {
    setCriticalValue(event.target.valueAsNumber);
  }, []);

  const onCriticalValueSave = useCallback(() => {
    updateCriticalValue(criticalValue, 'watering').then(() => {
      setNotificationMessage('New critical Rh value saved!');
    });
  }, [criticalValue, updateCriticalValue]);

  const onNotificationClose = useCallback(() => {
    setNotificationMessage('');
  }, []);

  useEffect(() => {
    setLoading(true);
    Promise.all([getRules('wateringRules'), getAutoRule('watering')]).then(
      ([wateringRulesData, autoWateringData]) => {
        setWateringRules(wateringRulesData);
        setAutoWatering(autoWateringData.enabled);
        setCriticalValue(autoWateringData.criticalValue);
        setLoading(false);
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" style={{ padding: '25px 0' }}>
        WATERING{' '}
        <span role="img" aria-label="water">
          💦
        </span>
      </Typography>
      <Divider />
      <FormControlLabel
        className={classes.switchContainer}
        labelPlacement="start"
        label={<Typography variant="h6">Automatic watering</Typography>}
        value={autoWatering}
        onChange={onAutoWateringRuleChange}
        control={<Switch checked={autoWatering} />}
      />
      <Divider />
      <FormControl fullWidth className={classes.formControlContainer}>
        <Typography variant="h6" style={{ paddingRight: '10px' }}>
          Set critical RH:
        </Typography>
        <TextField
          value={criticalValue}
          className={classes.textField}
          helperText="From 0 to 100"
          onChange={onCriticalValueChange}
          disabled={!autoWatering}
          inputProps={{
            type: 'number',
            min: 0,
            max: 100,
          }}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">% of Rh</InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={!autoWatering}
          onClick={onCriticalValueSave}
        >
          Save
        </Button>
      </FormControl>
      <Divider />
      <FormControl fullWidth className={classes.wateringRulesContainer}>
        <Typography variant="h5" display="inline">
          Watering rules
        </Typography>
        {loading ? (
          <Loading />
        ) : (
          <List classes={{ root: classes.listContainer }}>
            {wateringRules.map(({ from, to, id }, index) => {
              return (
                <Fragment key={id}>
                  <ListItem>
                    <ListItemIcon>
                      <InvertColors />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography display="inline" variant="subtitle1">
                          Watering from:{' '}
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
                  {index !== wateringRules.length - 1 && (
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
        isOpen={addWateringModalVisible}
        onSubmitCallback={getWateringData}
        onClose={onAddNewRuleModalClose}
        title="Add new watering rule"
        collectionName="wateringRules"
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

export default WateringCard;
