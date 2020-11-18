import React, {ReactElement} from 'react';
import {Provider} from 'react-redux';
import {Store} from 'redux';
import {ThemeProvider} from 'styled-components';
import {MuiThemeProvider, createMuiTheme, StylesProvider} from '@material-ui/core/styles';
import {ruRU} from '@material-ui/core/locale';
import {CssBaseline} from '@material-ui/core';

import Logger from 'shared/utils/Logger';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import AppRouter from 'router/AppRouter';

const theme = createMuiTheme(
  {
    palette: {
      primary: {
        light: '#a95517',
        main: '#f27a21',
        dark: '#f4944d',
        contrastText: '#ffffff',
      },
      secondary: {
        light: '#0d3478',
        main: '#134bac',
        dark: '#426fbc',
      },
      error: {
        light: '#a02724',
        main: '#e53934',
        dark: '#ea605c',
      },
    },
    typography: {
      fontFamily: ['Open Sans', 'sans-serif'].join(','),
      fontSize: 13,
    },
  },
  ruRU
);

interface IApp {
  store: Store;
  logger: Logger;
}

const App: React.FC<IApp> = ({store, logger}): ReactElement => (
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <Provider store={store}>
          <CssBaseline />
          <ErrorBoundary logger={logger}>
            <AppRouter />
          </ErrorBoundary>
        </Provider>
      </StylesProvider>
    </ThemeProvider>
  </MuiThemeProvider>
);

export default App;
