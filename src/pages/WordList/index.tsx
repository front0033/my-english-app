import * as React from 'react';

import {Grid} from '@material-ui/core';
import useStyles from './styles';

const WordList: React.FC = () => {
  const classes = useStyles();

  return <Grid className={classes.container}>WordList</Grid>;
};

export default React.memo(WordList);
