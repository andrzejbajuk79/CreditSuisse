import * as React from 'react';
import {fetchUserById} from '../../service/FakeApiService';

const CURRENTLY_LOGGED_USER = 12892; // with role OWNER
// const CURRENTLY_LOGGED_USER = 12355; // without role OWNER

export function withUser (WrappedComponent) {
  class SecurityHOC extends React.Component {
    state = {
      isLoading: false,
      user: null,
      isOwner: null,
      error: null,
    };

    componentDidMount () {
      this.doAuthentication ();
    }

    doAuthentication = () => {
      this.setState ({isLoading: true, user: null}, () =>
        fetchUserById (CURRENTLY_LOGGED_USER).then (
          this.onAuthenticationSuccess,
          this.onAuthenticationFailure
        )
      );
    };

    onAuthenticationSuccess = response => {
      const user = response.user || null;

      if (user.Roles.indexOf ('Owner') !== -1) {
        this.setState ({
          user,
          isFetching: false,
          isOwner: true,
        });
      } else {
        this.setState ({
          user,
          isFetching: false,
          isOwner: false,
        });
      }
    };

    onAuthenticationFailure = response => {
      const error = response.error || null;

      this.setState ({
        error,
        isLoading: false,
      });
    };

    render () {
      return <WrappedComponent {...this.props} security={this.state} />;
    }
  }

  return SecurityHOC;
}
