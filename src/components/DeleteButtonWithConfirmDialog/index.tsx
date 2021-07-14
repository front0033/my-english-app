import * as React from 'react';

import {IconButton, Popover, Grid, Typography, makeStyles, createStyles, Button} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';

interface IDeleteButtonWithConfirmDialogProps {
  id: string;
  text: string;
  buttonText?: string;
  action: () => void;
}

const useStyles = makeStyles(theme =>
  createStyles({
    popover: {
      position: 'relative',
    },
    content: {
      margin: theme.spacing(1.5, 3),
      width: 100,
    },
    text: {
      paddingBottom: theme.spacing(1),
    },
    icon: {
      color: theme.palette.secondary.main,
    },
  })
);

const PureDeleteButtonWithConfirmDialog: React.FC<IDeleteButtonWithConfirmDialogProps> = ({
  id,
  text,
  buttonText,
  action,
}) => {
  const classes = useStyles({});

  const [open, setOpen] = React.useState<boolean>(false);
  const [anchor, setAnchor] = React.useState<Element | null>(null);

  const handleCancelClick = () => setOpen(false);
  const handleConfirmClick = (event: React.MouseEvent) => {
    setAnchor(event.currentTarget);
    setOpen(true);
  };

  const handleActionClick = () => {
    action();
    setOpen(false);
  };

  return (
    <>
      {buttonText ? (
        <Button size="small" id={`delete-button-delete-${id}`} color="secondary" onClick={handleConfirmClick}>
          {buttonText}
        </Button>
      ) : (
        <IconButton id={`delete-icon-button-delete-${id}`} color="secondary" onClick={handleConfirmClick}>
          <DeleteForeverIcon className={classes.icon} />
        </IconButton>
      )}
      <Popover open={open} anchorEl={anchor}>
        <Grid id={`delete-dialog-${id}`} container className={classes.content}>
          <Grid item xs={12} className={classes.text}>
            <Typography>{text}</Typography>
          </Grid>
          <Grid item xs={6}>
            <IconButton id={`delete-dialog-button-cancel-${id}`} onClick={handleCancelClick}>
              <CancelIcon color="secondary" />
            </IconButton>
          </Grid>
          <Grid item xs={6} container justify="flex-end">
            <IconButton id={`delete-dialog-button-ok-${id}`} color="primary" onClick={handleActionClick}>
              <CheckCircleOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Popover>
    </>
  );
};

export default React.memo(PureDeleteButtonWithConfirmDialog);
