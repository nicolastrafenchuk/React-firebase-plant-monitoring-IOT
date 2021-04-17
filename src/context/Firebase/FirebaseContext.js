import React, { createContext, useMemo } from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyArmlePSq2Ec_8EY49eyAFJnMM9TUZUFtk',
  authDomain: 'plant-monitor-150ee.firebaseapp.com',
  databaseURL: 'https://plant-monitor-150ee.firebaseio.com',
  projectId: 'plant-monitor-150ee',
  storageBucket: 'plant-monitor-150ee.appspot.com',
  messagingSenderId: '384585451438',
};

// Instance of this class will contain all necessary methods
// for work with Firebase through context.

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.serverValue = app.firestore.ServerValue;

    this.auth = app.auth();
    this.db = app.firestore();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // eslint-disable-next-line no-param-reassign
        authUser = {
          uid: authUser.uid,
          email: authUser.email,
          emailVerified: authUser.emailVerified,
          providerData: authUser.providerData,
          displayName: authUser.displayName,
        };

        next(authUser);
      } else {
        fallback();
      }
    });

  user = (uid) => this.db.doc(`users/${uid}`);

  users = () => this.db.collection('users');

  humidity = () => this.db.collection('humidity');

  temperature = () => this.db.collection('temperature');

  pressure = () => this.db.collection('pressure');

  // eslint-disable-next-line camelcase
  humidity_g = () => this.db.collection('humidity_g');

  message = (uid) => this.db.doc(`messages/${uid}`);

  messages = () => this.db.collection('messages');
}

const FirebaseContext = createContext(null);

const FirebaseProvider = ({ children }) => {
  const firebase = useMemo(() => {
    return new Firebase();
  }, []);

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseProvider };
