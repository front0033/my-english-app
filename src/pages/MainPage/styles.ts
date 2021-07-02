import {makeStyles, Theme, createStyles} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: 'bold',
    },
    checkboxContainer: {
      padding: theme.spacing(2),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    container: {
      width: '80%',
      borderRadius: 10,
      margin: theme.spacing(2),
      height: '100%',
    },
    select: {
      minWidth: '80%',
      margin: theme.spacing(1),
      marginTop: theme.spacing(3),
    },
  })
);

export default useStyles;
