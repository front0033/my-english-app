import React, {ReactElement} from 'react';
import {MuiThemeProvider, createMuiTheme, StylesProvider} from '@material-ui/core/styles';
import {ruRU} from '@material-ui/core/locale';
import {CssBaseline} from '@material-ui/core';
import MainPage from 'pages/MainPage';

const theme = createMuiTheme({}, ruRU);

interface IApp {}

const App: React.FC<IApp> = (): ReactElement => (
  <MuiThemeProvider theme={theme}>
    <StylesProvider injectFirst>
      <CssBaseline />
      <MainPage />
    </StylesProvider>
  </MuiThemeProvider>
);

export default App;
