import * as React from 'react';

import { Box, AppBar, Grid, Typography, CssBaseline } from '@material-ui/core';
import UserInfoWithExitAction from 'components/UserInfoWithExitAction';
import { useLazyLogoutQuery } from 'redux/stores/auth/authApi';
import { useAppSelector } from 'redux/hooks';

import useStyles from './styles';

const DefaultLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  const [logout] = useLazyLogoutQuery();
  const profile = useAppSelector((store) => store.profile.userProfile) || {};
  const { username, user } = profile;

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <Box className={classes.root}>
      <AppBar className={classes.appBar} position="fixed" title="REACT APP" color="default">
        <Grid
          className={classes.titleContainer}
          container
          wrap="nowrap"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography className={classes.title} variant="h6">
            X-CHAT
          </Typography>
          {!!username && (
            <UserInfoWithExitAction userName={username} avatar={user?.avatar ?? ''} action={handleLogoutClick} />
          )}
        </Grid>
      </AppBar>
      <CssBaseline />
      {children}
    </Box>
  );
};

export default DefaultLayout;
