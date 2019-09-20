import React from 'react';
import { AuthUserContext } from '../Session';
import NavigationAuth from './NavigationAuth';
import NavigationNonAuth from './NavigationNonAuth';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

export default Navigation;
