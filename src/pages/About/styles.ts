import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(7),
      marginTop: theme.spacing(6),
      padding: theme.spacing(3),
      textAlign: 'center',
    },
    actions: {
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
    subTitle: {
      color: theme.palette.grey.A200,
      paddingBottom: theme.spacing(4),
    },
  })
);

export default useStyles;
