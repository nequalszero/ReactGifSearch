import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// Higher-Order Component / decorator - a function that takes an existing component
//   and then wraps it in another component to add some new functionality.
// In this case, this function will redirect a component back to the login page
//   if no user is logged in.
export default function(WrappedComponent) {
  class Auth extends React.Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        let hasLocalStorageUser = false;

        for (let key in localStorage) {
          if (key.startsWith("firebase:authUser:")) {
            hasLocalStorageUser = true;
          }
        }

        if (!hasLocalStorageUser) {
          browserHistory.push('/login');
        }
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Auth);
}
