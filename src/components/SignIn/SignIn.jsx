import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Typography,
  Grid,
  CssBaseline,
  Paper,
  Avatar,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { AuthContext } from '../../context/Auth';
import SignInForm from './SignInForm';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  image: {
    backgroundImage:
      'url(https://images.unsplash.com/photo-1537401845705-1a04003a2973?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=pawel-czerwinski-7EuUsw99KhE-unsplash.jpg&w=1920)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));

const SignInPage = () => {
  const classes = useStyles();

  const { auth, loading } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (auth && !loading) {
      history.replace('/');
    }
  }, [history, auth, loading]);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        className={classes.formContainer}
      >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <SignInForm />
        </div>
      </Grid>
    </Grid>
  );
};

export default SignInPage;
