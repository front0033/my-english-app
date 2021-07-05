import React, {ReactElement} from 'react';
import {MuiThemeProvider, createMuiTheme, StylesProvider} from '@material-ui/core/styles';
import {ruRU} from '@material-ui/core/locale';
import {CssBaseline, AppBar, Typography} from '@material-ui/core';
import MainPage from 'pages/MainPage';
import {Switch, Route} from 'react-router-dom';
import routes from 'routes';
import TopicPage from 'pages/TopicPage';
import WordPage from 'pages/WordPage';

const theme = createMuiTheme({}, ruRU);

interface IApp {}

const App: React.FC<IApp> = (): ReactElement => (
  <MuiThemeProvider theme={theme}>
    <StylesProvider injectFirst>
      <AppBar position="static" title="ENGLISH CARDS">
        <Typography variant="subtitle2">ENGLISH CARDS</Typography>
      </AppBar>
      <CssBaseline />
      <Switch>
        <Route exact path={routes.main()}>
          <MainPage />
        </Route>
        <Route exact path={routes.topic()}>
          <TopicPage />
        </Route>
        <Route exact path={routes.word()}>
          <WordPage />
        </Route>
      </Switch>
    </StylesProvider>
  </MuiThemeProvider>
);

export default App;
