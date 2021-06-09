import React, {ReactElement} from 'react';
import {MuiThemeProvider, createMuiTheme, StylesProvider} from '@material-ui/core/styles';
import {ruRU} from '@material-ui/core/locale';
import {CssBaseline} from '@material-ui/core';
import MainPage from 'pages/MainPage';
import {Switch, Route} from 'react-router-dom';
import routes from 'routes';
import AuthPage from 'pages/AuthPage';

const theme = createMuiTheme({}, ruRU);

interface IApp {}

const App: React.FC<IApp> = (): ReactElement => (
  <MuiThemeProvider theme={theme}>
    <StylesProvider injectFirst>
      <CssBaseline />
      <Switch>
        <Route exact path={routes.main()}>
          <MainPage />
        </Route>
        <Route exact path={routes.auth()}>
          <AuthPage />
        </Route>
      </Switch>
    </StylesProvider>
  </MuiThemeProvider>
);

export default App;
