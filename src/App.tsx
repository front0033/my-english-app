import React, { ReactElement } from 'react';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { ruRU } from '@material-ui/core/locale';
import { createTheme } from '@material-ui/core';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SubjectIcon from '@material-ui/icons/Subject';

import MainPage from 'pages/MainPage';
import { Switch, Route, useLocation } from 'react-router-dom';
import routes from 'routes';
import TopicPage from 'pages/TopicPage';
import WordPage from 'pages/WordPage';

import AppBottomNavigation, { IBotoomNavConfig } from 'components/toolBar';
import TopicList from 'pages/TopicList';
import WordList from 'pages/WordList';
import NotFoundPage from 'pages/NotFound';
import AboutPage from 'pages/About';
import AccessNavigator from 'components/AccessNavigator';
import SingInPage from 'pages/SignInPage';
import SignUpPage from 'pages/SignUpPage';
import ProfilePage from 'pages/ProfilePage';
import DefaultLayout from 'layouts/DefaultLayout';

const theme = createTheme({}, ruRU);

const toolbarConfig: IBotoomNavConfig = [
  { value: '', label: 'Cards', url: routes.main(), icon: ViewCarouselIcon },
  { value: 'words', label: 'Words', url: routes.words(), icon: ListAltIcon },
  { value: 'topics', label: 'Topics', url: routes.topics(), icon: SubjectIcon },
];

interface IApp {}

const App: React.FC<IApp> = (): ReactElement => {
  const { pathname } = useLocation();
  const [, page, id] = pathname.split('/');
  const pagePath = `/${page}`;
  const showToolbar = pagePath !== routes.signIn() && pagePath !== routes.signUp();

  return (
    <MuiThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <DefaultLayout page={page} id={id}>
          <AccessNavigator>
            <Switch>
              <Route exact path={routes.main()}>
                <MainPage />
              </Route>
              <Route exact path={routes.signIn()}>
                <SingInPage />
              </Route>
              <Route exact path={routes.signUp()}>
                <SignUpPage />
              </Route>
              <Route exact path={routes.profile()}>
                <ProfilePage />
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
              <Route exact path={routes.about()}>
                <AboutPage />
              </Route>
              <Route>
                <NotFoundPage />
              </Route>
            </Switch>
          </AccessNavigator>
        </DefaultLayout>
        {showToolbar && <AppBottomNavigation items={toolbarConfig} currentValue={page} />}
      </StylesProvider>
    </MuiThemeProvider>
  );
};

export default App;
