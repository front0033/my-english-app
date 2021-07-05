import React, {ReactElement} from 'react';
import {MuiThemeProvider, createMuiTheme, StylesProvider} from '@material-ui/core/styles';
import {ruRU} from '@material-ui/core/locale';
import {CssBaseline, AppBar, Typography, Grid, IconButton} from '@material-ui/core';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import MainPage from 'pages/MainPage';
import {Switch, Route, useLocation, Link} from 'react-router-dom';
import routes from 'routes';
import TopicPage from 'pages/TopicPage';
import WordPage from 'pages/WordPage';
import SelectPageMenu from 'components/menu';

const theme = createMuiTheme({}, ruRU);

interface IApp {}

const App: React.FC<IApp> = (): ReactElement => {
  const {pathname} = useLocation();
  const [, page] = pathname.split('/');
  return (
    <MuiThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <AppBar position="static" title="ENGLISH CARDS">
          <Grid container wrap="nowrap" justify="space-between" alignItems="center">
            {page && (
              <IconButton component={Link} to={routes.main()}>
                <ArrowBackIosOutlinedIcon />
              </IconButton>
            )}
            <Typography variant="h6" style={{marginLeft: 8}}>
              ENGLISH CARDS
            </Typography>
            <SelectPageMenu />
          </Grid>
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
};

export default App;
