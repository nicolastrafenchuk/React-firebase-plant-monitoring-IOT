import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import { FirebaseContext } from '../../context/Firebase';

const SignOutButton = () => {
  const { doSignOut } = useContext(FirebaseContext);

  return (
    <Tooltip title="Sign out from this account">
      <Button onClick={doSignOut}>Sign Out</Button>
    </Tooltip>
  );
};

export default SignOutButton;
