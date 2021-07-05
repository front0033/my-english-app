import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, {bindTrigger, bindMenu} from 'material-ui-popup-state';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import routes from 'routes';
import {Link} from 'react-router-dom';

export default function SelectPageMenu() {
  return (
    <PopupState variant="popover" popupId="english_words_select-menu">
      {popupState => (
        <>
          <IconButton {...bindTrigger(popupState)}>
            <AddCircleOutlineOutlinedIcon color="inherit" />
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
