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
import { Alert } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import routes from 'routes';
import { useGetTopicsQuery, useDeleteTopicMutation } from 'redux/stores/topics/topicSlice';
import DeleteButtonWithConfirmDialog from 'components/DeleteButtonWithConfirmDialog';

import useStyles from './styles';

const TopicList: React.FC = () => {
  const classes = useStyles();
  const {
    data,
    isSuccess: isTopicSuccess,
    isLoading: isTopicLoading,
    isError: isTopicsError,
    refetch: topicsRefecth,
  } = useGetTopicsQuery({});
  const [deleteTopic] = useDeleteTopicMutation();

  const topics = data || [];

  const handleDeleteById = (id: string) => () => {
    deleteTopic(id).then(() => {
      topicsRefecth();
    });
  };

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
        <List className={classes.list}>
          {topics.map((topic) => (
            <ListItem divider key={topic.id}>
              <ListItemText id={topic.id} primary={topic.name} />
              <ListItemSecondaryAction>
                <IconButton component={Link} to={routes.editTopic(topic.id)}>
                  <EditIcon />
                </IconButton>
                <DeleteButtonWithConfirmDialog
                  id={`topic-delete-button-${topic.id}`}
                  text="Are you sure?"
                  action={handleDeleteById(topic.id)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Grid>
  );
};

export default React.memo(TopicList);
