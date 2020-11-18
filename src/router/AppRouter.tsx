import React from 'react';
import {useSelector} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';

import {getAuthenticatedStatus} from 'redux/stores/user/getters';
import history from 'shared/history';

// Page components
import ProfilePage from 'pages/ProfilePage';

import PrivateRoute from './PrivateRoute';

const AppRouter = () => {
  const isAuthenticated = useSelector(getAuthenticatedStatus);

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={ProfilePage} />
        {/* Home page */}
        <PrivateRoute path="/" exact component={ProfilePage} isAuthenticated={isAuthenticated} />
        {/* 404 */}
        <Route component={() => <>Page not found</>} />
      </Switch>
    </ConnectedRouter>
  );
};

export default AppRouter;
