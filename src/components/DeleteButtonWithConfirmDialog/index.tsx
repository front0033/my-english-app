import * as React from 'react';

import {
  IconButton,
  Typography,
  makeStyles,
  createStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

interface IDeleteButtonWithConfirmDialogProps {
  id: string;
  text: string;
  action: () => void;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      width: 200,
    },
    icon: {
      color: theme.palette.secondary.main,
    },
  })
);

const PureDeleteButtonWithConfirmDialog: React.FC<IDeleteButtonWithConfirmDialogProps> = ({ id, text, action }) => {
  const classes = useStyles({});

  const [open, setOpen] = React.useState<boolean>(false);

  const handleCancelClick = () => setOpen(false);
  const handleConfirmClick = () => {
    setOpen(true);
  };

  const handleActionClick = () => {
    action();
    setOpen(false);
  };

  return (
    <>
      <IconButton id={`delete-icon-button-delete-${id}`} color="secondary" onClick={handleConfirmClick}>
        <DeleteForeverIcon className={classes.icon} />
      </IconButton>
      {!!open && (
        <Dialog
          open={open}
          onClose={handleCancelClick}
          aria-labelledby="draggable-dialog-title"
          fullWidth
          maxWidth="xs"
        >
          <DialogContent>
            <DialogContentText>
              <Typography>{text}</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCancelClick} color="primary">
              Cancel
            </Button>
            <Button onClick={handleActionClick} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default React.memo(PureDeleteButtonWithConfirmDialog);
