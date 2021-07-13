import * as React from 'react';

import {
  Grid,
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {Alert} from '@material-ui/lab';
import {useGetTopics} from 'redux/stores/topics/topicSlice';
import useStyles from './styles';

const TopicList: React.FC = () => {
  const classes = useStyles();
  const {data, isSuccess: isTopicSuccess, isLoading: isTopicLoading, isError: isTopicsError} = useGetTopics({});

  const topics = data?.topics ?? [];

  return (
    <Grid className={classes.container}>
      {isTopicsError && <Alert severity="error">topics: server error</Alert>}
      {isTopicLoading && (
        <Grid container direction="column" alignItems="center">
          <Typography className={classes.progressCaption} variant="caption">
            Loading topics...
          </Typography>
          <LinearProgress className={classes.progress} />
        </Grid>
      )}
      {isTopicSuccess && !topics.length && <Alert severity="info">Topics are missing.</Alert>}
      {isTopicSuccess && !!topics.length && (
        <List className={classes.width100}>
          {topics.map(topic => (
            <ListItem divider key={topic.id}>
              <ListItemText id={topic.id} primary={topic.name} />
              <ListItemSecondaryAction>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Grid>
  );
};

export default React.memo(TopicList);
