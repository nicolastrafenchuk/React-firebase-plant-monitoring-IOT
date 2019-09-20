import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withAutorization = (condition) => (Component) => {
  class WithAutorization extends React.Component {
    componentDidMount() {
      const { firebase, history } = this.props;

      this.listener = firebase.auth.onAuthStateChanged((authUser) => {
        if (!condition(authUser)) {
          history.push(ROUTES.LANDING);
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      const { rest } = this.props;

      return <Component {...rest} />;
    }
  }
  return compose(
    withRouter,
    withFirebase,
  )(WithAutorization);
};
export default withAutorization;
