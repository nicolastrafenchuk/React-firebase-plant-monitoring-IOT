import React, { memo, useCallback, useContext } from 'react';
import { Route } from 'react-router-dom';

import { AuthContext } from '../../context/Auth';

const ProtectedRoute = memo(({ children, path, exact = false }) => {
  const { auth, loading } = useContext(AuthContext);

  const render = useCallback(() => {
    if (!auth && !loading) {
      window.location.href = '/signin';
    }
    return children;
  }, [auth, loading, children]);

  return <Route path={path} exact={exact} render={render} />;
});

export default ProtectedRoute;
