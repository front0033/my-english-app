import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    textField: {
      marginTop: theme.spacing(2),
    },
    errorAlert: {
      marginTop: theme.spacing(2),
    },
    actions: {
      padding: theme.spacing(3),
    },
    helpText: {
      position: 'absolute',
      height: 10,
      bottom: -10,
      width: 'max-content',
    },
  })
);

export default useStyles;
