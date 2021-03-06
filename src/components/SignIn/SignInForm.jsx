import React, { useState, useCallback, useMemo, useContext } from 'react';
import { Button, TextField, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { FirebaseContext } from '../../context/Firebase';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '20%',
  },
  submitContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  error: {
    color: 'red',
  },
}));

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { doSignInWithEmailAndPassword } = useContext(FirebaseContext);

  const classes = useStyles();

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      doSignInWithEmailAndPassword(email, password)
        .then(() => {
          setEmail('');
          setPassword('');
          setError(null);
        })
        .catch((err) => {
          setError(err);
        });
    },
    [doSignInWithEmailAndPassword, email, password],
  );

  const onEmailChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const onPasswordChange = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  const isInvalid = useMemo(() => {
    return !password || !email;
  }, [email, password]);

  return (
    <form className={classes.form} noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={onEmailChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={onPasswordChange}
      />
      <div className={classes.submitContainer}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={onSubmit}
          disabled={isInvalid}
        >
          Sign In
        </Button>
      </div>
      {error && (
        <Typography variant="h6" className={classes.error} align="center">
          {error.message}
        </Typography>
      )}
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          {`Copyright © Plant Monitoring ${new Date().getFullYear()}.`}
        </Typography>
      </Box>
    </form>
  );
};

export default SignInForm;
