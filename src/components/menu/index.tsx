import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import AddIcon from '@material-ui/icons/Add';
import routes from 'routes';
import { Link } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core';

export const useStyle = makeStyles((theme) =>
  createStyles({
    icon: {
      color: theme.palette.common.white,
    },
  })
);

export default function SelectPageMenu() {
  const classes = useStyle();
  return (
    <PopupState variant="popover" popupId="english_words_select-menu">
      {(popupState) => (
        <>
          <IconButton {...bindTrigger(popupState)}>
            <AddIcon className={classes.icon} />
          </IconButton>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>
              <Link to={routes.topic()}>Topic</Link>
            </MenuItem>
            <MenuItem onClick={popupState.close}>
              <Link to={routes.word()}>Word</Link>
            </MenuItem>
          </Menu>
        </>
      )}
    </PopupState>
  );
}
