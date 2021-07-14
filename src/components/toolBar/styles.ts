import { makeStyles, createStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'fixed',
      width: '100%',
      bottom: 0,
    },
  })
);

export default useStyles;
