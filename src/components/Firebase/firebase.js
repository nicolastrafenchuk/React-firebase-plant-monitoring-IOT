import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyArmlePSq2Ec_8EY49eyAFJnMM9TUZUFtk",
    authDomain: "plant-monitor-150ee.firebaseapp.com",
    databaseURL: "https://plant-monitor-150ee.firebaseio.com",
    projectId: "plant-monitor-150ee",
    storageBucket: "plant-monitor-150ee.appspot.com",
    messagingSenderId: "384585451438"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
    }

    //Використаємо FIREBASE AUTH API:
    //Створюємо користувача, точніше реєструємо за допомогою email та password:
    
    doCreateUserWithEmailAndPassword = (email,password) => 
    this.auth.createUserWithEmailAndPassword(email,password);
    
    //Вхід в наш застосунок за допомогою email та password:
    
    doSignInWithEmailAndPassword = (email,password) => 
    this.auth.signInWithEmailAndPassword(email,password);

    //Вихід з системи

    doSignOut = () => this.auth.signOut();

    //Скинути пароль

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    //Оновити пароль

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;