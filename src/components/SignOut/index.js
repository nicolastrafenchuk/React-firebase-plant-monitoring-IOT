import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { Route, Redirect } from 'react-router';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

import { withFirebase } from '../Firebase';

function SignOutButton({ firebase }){

    return(
        <Tooltip title="Sign out from this account">
            <Button onClick={firebase.doSignOut}>
                Sign Out
            </Button>
        </Tooltip>
    )
}

export default withFirebase(SignOutButton);