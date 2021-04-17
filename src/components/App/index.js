import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import Header from '../Header';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import Control from '../Control';
import { FullScreenLoading } from '../Loading';
import * as ROUTES from '../../constants/routes';
import { AuthContext } from '../../context/Auth';

const App = () => {
  const { auth, loading: authLoading } = useContext(AuthContext);

  return (
    <>
      <FullScreenLoading isLoading={authLoading} />
      <Router>
        {auth && !authLoading && <Header />}
        <Switch>
          <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route
            exact
            path={ROUTES.PASSWORD_FORGET}
            component={PasswordForgetPage}
          />
          <ProtectedRoute exact path={ROUTES.HOME}>
            <HomePage />
          </ProtectedRoute>
          <ProtectedRoute exact path={ROUTES.ACCOUNT}>
            <AccountPage />
          </ProtectedRoute>
          <ProtectedRoute exact path={ROUTES.ADMIN}>
            <AdminPage />
          </ProtectedRoute>
          <ProtectedRoute exact path={ROUTES.CONTROL}>
            <Control />
          </ProtectedRoute>
        </Switch>
      </Router>
    </>
  );
};

export default App;
