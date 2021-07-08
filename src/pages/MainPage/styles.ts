import {makeStyles, Theme, createStyles} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      height: '90%',
    },
    select: {
      minWidth: '80%',
      height: '20%',
      margin: theme.spacing(1),
      marginTop: theme.spacing(3),
    },
    swiperContainer: {
      height: '70%',
    },
    slide: {
      textAlign: 'center',
      fontSize: 18,
      width: '100%',
      boxPack: 'center',
    },
    progress: {
      marginTop: theme.spacing(2),
    },
  })
);

export default useStyles;
