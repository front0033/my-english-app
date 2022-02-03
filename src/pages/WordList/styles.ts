import { makeStyles, createStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(7),
    },
    progress: {
      marginTop: theme.spacing(1),
      width: '100%',
    },
    circularProgress: {
      marginTop: theme.spacing(1),
    },
    progressCaption: {
      marginTop: theme.spacing(2),
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexShrink: 0,
    },
    list: {
      width: '100%',
      height: 300,
      overflow: 'auto',
    },
    width100: {
      width: '100%',
    },
    emptyDataAlert: {
      marginTop: theme.spacing(2),
    },
  })
);

export default useStyles;
