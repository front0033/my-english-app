import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(5),
      padding: theme.spacing(2),
    },
    textField: {
      marginTop: theme.spacing(3),
    },
    submitButton: {
      marginTop: theme.spacing(2),
    },
    progress: {
      marginTop: theme.spacing(2),
    },
    error: {
      marginTop: theme.spacing(2),
    },
  })
);

export default useStyles;
