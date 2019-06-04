import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
const withAutorization = condition => Component => {
  class WithAutorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.LANDING);
          }
}, );
}
componentWillUnmount() {
    this.listener();
}
  render() {
    return (
      <Component {...this.props} />
    );
} }
return compose(
  withRouter,
  withFirebase,
)(WithAutorization);
};
export default withAutorization;