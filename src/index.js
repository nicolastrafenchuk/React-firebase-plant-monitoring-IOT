import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Firebase, { FirebaseContext } from './components/Firebase';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import './index.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: lightGreen.A100,
      main: lightGreen.A200,
      dark: lightGreen.A700,
    },
    secondary: {
      main: lightGreen[500],
    },
  },
  overrides: {
    MuiButton: {
      textPrimary: {
        color: 'black',
      },
    },
  },
});

ReactDOM.render(
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <MuiThemeProvider theme={theme}>
      <FirebaseContext.Provider value={new Firebase()}>
        <App />
      </FirebaseContext.Provider>
    </MuiThemeProvider>
  </MuiPickersUtilsProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
