import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(6),
      padding: theme.spacing(3),
      textAlign: 'center',
    },
    actions: {
      marginTop: theme.spacing(6),
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
    },
    icon: {
      color: theme.palette.error.dark,
      height: 72,
      marginBottom: theme.spacing(4),
      width: 72,
    },
  })
);

export default useStyles;
