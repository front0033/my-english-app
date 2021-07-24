import * as React from 'react';

import {
  Grid,
  CircularProgress,
  List,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Alert } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import ReactList from 'react-list';
import { useDeleteWordMutation, useGetWordsByTopicIdQuery } from 'redux/stores/words/wordSlice';
import DeleteButtonWithConfirmDialog from 'components/DeleteButtonWithConfirmDialog';
import routes from 'routes';

import useStyles from './styles';

interface IWordListByTopicIdProps {
  topicId: string;
}

const WordListByTopicId: React.FC<IWordListByTopicIdProps> = ({ topicId }) => {
  const classes = useStyles();

  const { data: words = [], isSuccess, isLoading, isError } = useGetWordsByTopicIdQuery(topicId || '', {
    skip: !topicId,
  });

  const [deleteWordById] = useDeleteWordMutation();

  const deleteWord = (id: string) => () => {
    deleteWordById(id);
  };

  const renderItem = (index: number, key: React.ReactText) => (
    <ListItem divider key={key}>
      <ListItemText id={words[index].id} primary={words[index].word} />
      <ListItemSecondaryAction>
        <IconButton component={Link} to={routes.editWord(words[index].id)}>
          <EditIcon />
        </IconButton>
        <DeleteButtonWithConfirmDialog
          id={`word-delete-button-${words[index].id}`}
          text={`Do you exactly want to delete «${words[index].word}?»`}
          action={deleteWord(words[index].id)}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );

  return React.useMemo(
    () => (
      <>
        {isLoading && (
          <Grid container justifyContent="center">
            <CircularProgress className={classes.progress} />
          </Grid>
        )}
        {isError && <Alert severity="error">words: server error</Alert>}
        {isSuccess && !!words.length && (
          <List className={classes.list}>
            <ReactList key={topicId} itemRenderer={renderItem} length={words.length} type="uniform" />
          </List>
        )}
        {isSuccess && !words.length && (
          <Alert className={classes.width100} severity="info">
            Words are missing.
          </Alert>
        )}
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading, isError, isSuccess, words]
  );
};

export default React.memo(WordListByTopicId);
