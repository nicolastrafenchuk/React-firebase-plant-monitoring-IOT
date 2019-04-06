import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TypoGraphy from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Home from '@material-ui/core/Icon';
//import MenuItem from '@material-ui/core/MenuItem';
//import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const Navigation = () => (

        <AppBar position="static">
            <Toolbar>
                <IconButton  color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <TypoGraphy variant="title" color="inherit">
                    <Button component={Link} to={ROUTES.LANDING}>
                        Landing
                    </Button>
                </TypoGraphy>
                <List component="nav">
                    <ListItem component="div">
                    
                    <ListItemText inset>
                        <TypoGraphy color="inherit" variant="title">
                            <Button component={Link} to={ROUTES.SIGN_IN}>Sign In</Button>
                        </TypoGraphy>
                    </ListItemText>

                    <ListItemText inset>
                        <TypoGraphy color="inherit" variant="title">
                            <Button component={Link} to={ROUTES.LANDING}>Landing</Button>
                        </TypoGraphy>
                    </ListItemText>

                    <ListItemText inset>
                        <TypoGraphy color="inherit" variant="title">
                            <Button component={Link} to={ROUTES.HOME}>Home</Button><Home/>
                        </TypoGraphy>
                    </ListItemText>

                    <ListItemText inset>
                        <TypoGraphy color="inherit" variant="title">
                            <Button component={Link} to={ROUTES.ACCOUNT}>Account</Button>
                        </TypoGraphy>
                    </ListItemText>

                    <ListItemText inset>
                        <TypoGraphy color="inherit" variant="title">
                            <Button component={Link} to={ROUTES.ADMIN}>Admin</Button>
                        </TypoGraphy>
                    </ListItemText>

                    </ListItem>
                </List>
                
            </Toolbar>
        </AppBar>
);

export default Navigation;