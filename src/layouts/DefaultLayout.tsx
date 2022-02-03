import * as React from 'react';

import { Link } from 'react-router-dom';
import { Box, AppBar, Grid, Typography, CssBaseline, colors, IconButton } from '@material-ui/core';
import UserInfoWithExitAction from 'components/UserInfoWithExitAction';
import { useLazyLogoutQuery } from 'redux/stores/auth/authApi';
import { useAppSelector } from 'redux/hooks';
import SelectPageMenu from 'components/menu';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import routes from 'routes';

import useStyles from './styles';

interface IDefaultLayoutProps {
  page: string;
  id: string;
}

const DefaultLayout: React.FC<IDefaultLayoutProps> = ({ page, id, children }) => {
  const classes = useStyles();

  const [logout] = useLazyLogoutQuery();
  const profile = useAppSelector((store) => store.profile.userProfile) || {};
  const { username, user } = profile;

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <Box className={classes.root}>
      <AppBar position="fixed" title="ENGLISH CARDS">
        <Grid container wrap="nowrap" justifyContent="space-between" alignItems="center">
          {page && (
            <IconButton component={Link} to={id ? routes.currentPage(page) : routes.main()}>
              <ArrowBackIosOutlinedIcon style={{ color: colors.common.white }} />
            </IconButton>
          )}
          <Typography component={Link} to={routes.about()} variant="h6" className={classes.title}>
            ENGLISH CARDS
          </Typography>
          <SelectPageMenu />
          {!!username && (
            <UserInfoWithExitAction userName={username} avatar={user?.avatar ?? ''} action={handleLogoutClick} />
          )}
        </Grid>
      </AppBar>
      <CssBaseline />
      <CssBaseline />
      {children}
    </Box>
  );
};

export default DefaultLayout;
