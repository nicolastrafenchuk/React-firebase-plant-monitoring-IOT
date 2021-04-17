import React, { createContext, useContext, useState, useEffect } from 'react';

import { FirebaseContext } from '../Firebase';

const initialState = {
  auth: false,
  displayName: '',
  email: '',
  loading: true,
};

const AuthContext = createContext(initialState);

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(initialState);

  const { onAuthUserListener } = useContext(FirebaseContext);

  useEffect(() => {
    const unsubscribe = onAuthUserListener(
      ({ displayName, email }) => {
        setAuthState({
          displayName,
          email,
          auth: true,
          loading: false,
        });
      },
      () => {
        setAuthState({ ...initialState, loading: false });
      },
    );

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
