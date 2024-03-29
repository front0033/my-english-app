import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: '100vh',
    },
    appBar: {
      height: 50,
    },
    logo: {
      height: 50,
      width: 100,
    },
    titleContainer: {
      paddingLeft: theme.spacing(2),
      height: 50,
    },
    title: {
      marginLeft: 8,
      textDecoration: 'none',
      color: theme.palette.common.white,
    },
  })
);

export default useStyles;
