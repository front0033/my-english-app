import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    user: {
      fontWeight: 400,
      padding: theme.spacing(0.8, 1),
    },
    userLabel: {
      maxWidth: 200,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    typography: {
      padding: theme.spacing(2),
    },
    button: {
      margin: theme.spacing(2),
      width: 150,
    },
    avatar: {
      fontSize: 14,
      marginRight: theme.spacing(1),
    },
  })
);

export default useStyles;
