import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const LocalNotification = ({ isOpen, onClose, message, severity }) => {
  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={onClose}>
      <Alert
        elevation={6}
        variant="filled"
        onClose={onClose}
        severity={severity}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default LocalNotification;

LocalNotification.propTypes = {
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  severity: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
