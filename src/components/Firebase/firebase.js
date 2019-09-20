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

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.serverValue = app.firestore.ServerValue;

    this.auth = app.auth();
    this.db = app.firestore();
  }

  // Використаємо FIREBASE AUTH API:
  // Створюємо користувача, точніше реєструємо за допомогою email та password:

  // eslint-disable-next-line max-len
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // Вхід в наш застосунок за допомогою email та password:

  // eslint-disable-next-line max-len
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // Вихід з системи

  doSignOut = () => this.auth.signOut();

  // Скинути пароль

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  // Оновити пароль

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .get('value')
          .then((snapshot) => {
            const dbUser = snapshot.data();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            // merge auth and db user
            // eslint-disable-next-line no-param-reassign
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = (uid) => this.db.doc(`users/${uid}`);

  users = () => this.db.collection('users');

  humidity = () => this.db.collection('humidity');

  temperature = () => this.db.collection('temperature');

  pressure = () => this.db.collection('pressure');

  // eslint-disable-next-line camelcase
  humidity_g = () => this.db.collection('humidity_g');

  // *** Message API ***

  message = (uid) => this.db.doc(`messages/${uid}`);

  messages = () => this.db.collection('messages');
}

export default Firebase;
