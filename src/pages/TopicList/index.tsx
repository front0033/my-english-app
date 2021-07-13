import * as React from 'react';

import {Grid} from '@material-ui/core';
import useStyles from './styles';

const TopicList: React.FC = () => {
  const classes = useStyles();

  return <Grid className={classes.container}>TopicList</Grid>;
};

export default React.memo(TopicList);
