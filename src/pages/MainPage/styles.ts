import {makeStyles, Theme, createStyles} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      height: '90%',
    },
    select: {
      minWidth: '80%',
      height: '7%',
      margin: theme.spacing(1),
      marginTop: theme.spacing(3),
    },
    wordsContainer: {
      height: '85%',
    },
    slide: {
      textAlign: 'center',
      fontSize: 18,
      width: '100%',
      height: '100%',
      boxPack: 'center',
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
    translateButton: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      border: `2px solid ${theme.palette.primary.main}`,
    },
  })
);

export default useStyles;
