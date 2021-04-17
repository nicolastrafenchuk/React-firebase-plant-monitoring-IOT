import React, {
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FirebaseContext } from '../../context/Firebase';
import { AuthContext } from '../../context/Auth';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => {
  const { auth, loading } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (auth && !loading) {
      history.replace('/');
    }
  }, [history, auth, loading]);

  return (
    <div>
      <h1>SignUp</h1>
      <SignUpForm />
    </div>
  );
};

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [primaryPassword, setPrimaryPassword] = useState('');
  const [secondaryPassword, setSecondaryPassword] = useState('');
  const [error, setError] = useState(null);

  const { doCreateUserWithEmailAndPassword } = useContext(FirebaseContext);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      doCreateUserWithEmailAndPassword(email, primaryPassword)
        .then(() => {
          setUsername('');
          setEmail('');
          setPrimaryPassword('');
          setSecondaryPassword('');
          setError(null);
        })
        .catch((err) => {
          setError(err);
        });
    },
    [doCreateUserWithEmailAndPassword, email, primaryPassword],
  );

  const onUsernameChange = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  const onEmailChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const onPrimaryPasswordChange = useCallback((event) => {
    setPrimaryPassword(event.target.value);
  }, []);

  const onSecondaryPasswordChange = useCallback((event) => {
    setSecondaryPassword(event.target.value);
  }, []);

  const isInvalid = useMemo(
    () =>
      primaryPassword !== secondaryPassword ||
      !primaryPassword ||
      !secondaryPassword ||
      !email ||
      !username,
    [email, primaryPassword, secondaryPassword, username],
  );

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        value={username}
        onChange={onUsernameChange}
        type="text"
        placeholder="Full Name"
      />

      <input
        name="email"
        value={email}
        onChange={onEmailChange}
        type="text"
        placeholder="Email Address"
      />

      <input
        name="primaryPassword"
        value={primaryPassword}
        onChange={onPrimaryPasswordChange}
        type="password"
        placeholder="Password"
      />

      <input
        name="secondaryPassword"
        value={secondaryPassword}
        onChange={onSecondaryPasswordChange}
        type="password"
        placeholder="Confirm Password"
      />

      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignUpLink = () => (
  <p>
    Don`&apos;`t have an account?
    <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

export default SignUpPage;

export { SignUpForm, SignUpLink };
