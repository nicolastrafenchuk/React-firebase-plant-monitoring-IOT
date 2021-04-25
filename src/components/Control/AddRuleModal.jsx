import React, { useState, useCallback, useContext, useEffect } from 'react';
import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  Divider,
  FormControlLabel,
  Button,
} from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { TimePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

import { FirebaseContext } from '../../context/Firebase';
import Loading from '../Loading';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '400px',
  },
  timePickersContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '10px 0',
    height: '140px',
  },
  buttonsContainer: {
    paddingTop: '10px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const AddRuleModal = ({
  isOpen,
  onSubmitCallback,
  onClose,
  title,
  collectionName,
}) => {
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const classes = useStyles();

  const { saveRule } = useContext(FirebaseContext);

  const onSaveClick = useCallback(() => {
    setLoading(true);
    saveRule(startTime, endTime, collectionName)
      .then(() => onSubmitCallback())
      .then(() => {
        setLoading(false);
        onClose();
      });
  }, [endTime, onClose, onSubmitCallback, saveRule, startTime, collectionName]);

  useEffect(() => {
    if (isOpen === true) {
      setStartTime(
        new Date(new Date().setMinutes(new Date().getMinutes() - 10)),
      );
      setEndTime(new Date());
    }
  }, [isOpen]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <div className={classes.paper}>
          <Typography variant="h5" id="transition-modal-title">
            {title}
          </Typography>
          <Divider />
          <div className={classes.timePickersContainer}>
            {loading ? (
              <Loading />
            ) : (
              <>
                <FormControlLabel
                  label={<Typography>Start: </Typography>}
                  labelPlacement="start"
                  control={
                    <TimePicker
                      ampm={false}
                      showTodayButton
                      value={startTime}
                      onChange={setStartTime}
                      style={{ marginLeft: '143px' }}
                    />
                  }
                  style={{ marginBottom: '14px' }}
                />
                <FormControlLabel
                  label={<Typography>End: </Typography>}
                  labelPlacement="start"
                  control={
                    <TimePicker
                      ampm={false}
                      showTodayButton
                      value={endTime}
                      onChange={setEndTime}
                      style={{ marginLeft: '150px' }}
                    />
                  }
                  style={{ marginBottom: '7px' }}
                />
              </>
            )}
          </div>
          <Divider />
          <span className={classes.buttonsContainer}>
            <Button variant="contained" color="inherit" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={onSaveClick}
              style={{ marginLeft: '10px' }}
              startIcon={<Save />}
            >
              Save
            </Button>
          </span>
        </div>
      </Fade>
    </Modal>
  );
};

export default AddRuleModal;
