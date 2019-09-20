import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import * as ROUTES from '../../constants/routes';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavigationNonAuth() {
  const classes = useStyles();
  const [name, setName] = React.useState('Take care of your plants 🌿');

  function handleDrawerNameLogin() {
    setName('Login');
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            edge="start"
            className={classes.title}
          >
            {name}
          </Typography>
          <Button
            edge="end"
            color="inherit"
            onClick={handleDrawerNameLogin}
            component={Link}
            to={ROUTES.SIGN_IN}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavigationNonAuth;
