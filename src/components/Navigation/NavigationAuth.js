import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import DirectionRunIcon from '@material-ui/icons/DirectionsRun';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function NavigationAuth() {
    
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('Monitor');

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    function handleDrawerNameHome () {
        setName('Monitor');
    };

    function handleDrawerNameControl() {
        setName('Control');
    };

    function handleDrawerNameSignOut() {
        setName('Sign Out');
    };



    return (
        <div className={classes.root}>
        <CssBaseline />
        <AppBar
            position="static"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
                {name}
            </Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
            paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
                <ListItem> 
                    <ListItemIcon><MultilineChartIcon /></ListItemIcon>
                    <ListItemText>
                        <Typography color="inherit" variant="h6">
                            <Tooltip title="Home page with all monitor graphs">
                                <Button onClick={handleDrawerNameHome} component={Link} to={ROUTES.HOME}>Monitor</Button>
                            </Tooltip>
                        </Typography>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon><ControlCameraIcon /></ListItemIcon>
                    <ListItemText>
                        <Typography color="inherit" variant="h6">
                            <Tooltip title="Control your plants">
                                <Button onClick={handleDrawerNameControl}>Control</Button>
                            </Tooltip>
                        </Typography>
                    </ListItemText>
                </ListItem>  
            </List>
            <Divider />
            <List>
                <ListItem>
                    <ListItemIcon><DirectionRunIcon /></ListItemIcon>
                    <ListItemText>
                        <Typography color="inherit" variant="h6">
                            <SignOutButton onClick={handleDrawerNameSignOut}/>
                        </Typography>
                    </ListItemText>
                </ListItem>
            </List>
        </Drawer>
        </div>
    );
}

export default NavigationAuth;
