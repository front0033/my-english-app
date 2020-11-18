import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import history from 'shared/history';

interface IRoute {
  component: any;
  path: string;
  isAuthenticated: boolean;
  [key: string]: any;
}

const PrivateRoute: React.FC<IRoute> = ({component: Component, isAuthenticated, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: {
              from: props.location,
              nextPathname: history.location.pathname,
            },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
