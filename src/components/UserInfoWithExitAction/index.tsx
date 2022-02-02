import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Avatar, Grid } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import routes from 'routes';

import useStyles from './styles';

interface IUserInfoWithExitActionProps {
  userName: string;
  avatar: string;
  action: () => void;
}

const UserInfoWithExitAction: React.FC<IUserInfoWithExitActionProps> = ({ userName, avatar, action }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [initials, setInitials] = useState('');

  useEffect(() => {
    setInitials(
      (userName || '')
        .replace(/@.*/, '')
        .split('.')
        .slice(0, 2)
        .map((token) => token[0])
        .join('')
    );
  }, [userName]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    action();
    setInitials('');
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'user-info-popover' : undefined;

  return (
    <div>
      {userName && (
        <>
          <Button
            className={classes.user}
            aria-describedby={id}
            variant="text"
            onClick={handleClick}
            endIcon={<ArrowDropDownIcon />}
          >
            <Avatar className={classes.avatar} src={avatar}>
              {!avatar && initials}
            </Avatar>
            <span className={classes.userLabel}>{userName}</span>
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Grid container direction="column" justify="center" alignItems="center">
              <Typography className={classes.typography}>{userName}</Typography>
              <Button
                className={classes.button}
                variant="outlined"
                component={Link}
                to={routes.profile()}
                onClick={handleEditClick}
              >
                Редактировать
              </Button>
              <Button className={classes.button} variant="outlined" onClick={handleLogoutClick}>
                Выйти
              </Button>
            </Grid>
          </Popover>
        </>
      )}
      {!userName && (
        <Button variant="outlined" onClick={handleLogoutClick}>
          Выйти
        </Button>
      )}
    </div>
  );
};

export default React.memo(UserInfoWithExitAction);
