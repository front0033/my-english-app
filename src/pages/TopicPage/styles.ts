import {makeStyles, Theme, createStyles} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginTop: theme.spacing(3),
    },
    submitButton: {
      marginTop: theme.spacing(2),
    },
  })
);

export default useStyles;
