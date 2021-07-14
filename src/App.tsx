import React, { ReactElement } from 'react';
import { MuiThemeProvider, createMuiTheme, StylesProvider } from '@material-ui/core/styles';
import { ruRU } from '@material-ui/core/locale';
import { CssBaseline, AppBar, Typography, Grid, IconButton, colors } from '@material-ui/core';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SubjectIcon from '@material-ui/icons/Subject';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import MainPage from 'pages/MainPage';
import { Switch, Route, useLocation, Link } from 'react-router-dom';
import routes from 'routes';
import TopicPage from 'pages/TopicPage';
import WordPage from 'pages/WordPage';
import SelectPageMenu from 'components/menu';
import AppBottomNavigation, { IBotoomNavConfig } from 'components/toolBar';
import TopicList from 'pages/TopicList';
import WordList from 'pages/WordList';

const theme = createMuiTheme({}, ruRU);

const toolbarConfig: IBotoomNavConfig = [
  { value: '', label: 'Cards', url: routes.main(), icon: ViewCarouselIcon },
  { value: 'words', label: 'Words', url: routes.words(), icon: ListAltIcon },
  { value: 'topics', label: 'Topics', url: routes.topics(), icon: SubjectIcon },
];

interface IApp {}

const App: React.FC<IApp> = (): ReactElement => {
  const { pathname } = useLocation();
  const [, page, id] = pathname.split('/');

  return (
    <MuiThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <AppBar position="static" title="ENGLISH CARDS">
          <Grid container wrap="nowrap" justify="space-between" alignItems="center">
            {page && (
              <IconButton component={Link} to={id ? routes.currentPage(page) : routes.main()}>
                <ArrowBackIosOutlinedIcon style={{ color: colors.common.white }} />
              </IconButton>
            )}
            <Typography variant="h6" style={{ marginLeft: 8 }}>
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
          <Route exact path={routes.editTopic()}>
            <TopicPage />
          </Route>
          <Route exact path={routes.word()}>
            <WordPage />
          </Route>
          <Route exact path={routes.editWord()}>
            <WordPage />
          </Route>
          <Route exact path={routes.words()}>
            <WordList />
          </Route>
          <Route exact path={routes.topics()}>
            <TopicList />
          </Route>
        </Switch>
        <AppBottomNavigation items={toolbarConfig} currentValue={page} />
      </StylesProvider>
    </MuiThemeProvider>
  );
};

export default App;
