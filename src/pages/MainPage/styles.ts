import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(5),
      width: '100%',
      height: '85%',
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
    progressContainer: {
      marginTop: theme.spacing(5),
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
      width: 45,
      height: 45,
    },
    wordButton: {
      fontSize: 29,
      wordBreak: 'break-word',
    },
  })
);

export default useStyles;
