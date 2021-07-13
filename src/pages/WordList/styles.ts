import {makeStyles, createStyles, Theme} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
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
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    list: {
      width: '100%',
    },
    width100: {
      width: '100%',
    },
  })
);

export default useStyles;