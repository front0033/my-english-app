import * as React from 'react';

import {
  Grid,
  List,
  Typography,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import ReactList from 'react-list';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import routes from 'routes';
import { useGetTopicsQuery } from 'redux/stores/topics/topicSlice';
import { useGetWordsByTopicIdQuery, useDeleteWordMutation } from 'redux/stores/words/wordSlice';
import DeleteButtonWithConfirmDialog from 'components/DeleteButtonWithConfirmDialog';

import useStyles from './styles';

const WordList: React.FC = () => {
  const classes = useStyles();
  const {
    data: topicData,
    isSuccess: isTopicSuccess,
    isLoading: isTopicLoading,
    isError: isTopicsError,
  } = useGetTopicsQuery({});
  const [topicId, setTopicId] = React.useState<string | false>(false);
  const {
    data: wordData,
    isSuccess: isWordSuccess,
    isLoading: isWordLoading,
    isError: isWordError,
    refetch: wordsRefetch,
  } = useGetWordsByTopicIdQuery(topicId || '');

  const [deleteWordById] = useDeleteWordMutation();

  const deleteWord = (id: string) => () => {
    deleteWordById(id).then(() => {
      wordsRefetch();
    });
  };

  const words = wordData || [];
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setTopicId(isExpanded ? panel : false);
  };

  const topics = topicData || [];
  const renderItem = (index: number, key: React.ReactText) => (
    <ListItem divider key={key}>
      <ListItemText id={words[index].id} primary={words[index].word} />
      <ListItemSecondaryAction>
        <IconButton component={Link} to={routes.editWord(words[index].id)}>
          <EditIcon />
        </IconButton>
        <DeleteButtonWithConfirmDialog
          id={`word-delete-button-${words[index].id}`}
          text="Are you sure?"
          action={deleteWord(words[index].id)}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );

  return (
    <Grid className={classes.container}>
      {isTopicLoading && (
        <Grid container direction="column" alignItems="center">
          <Typography className={classes.progressCaption} variant="caption">
            Loading topics...
          </Typography>
          <LinearProgress className={classes.progress} />
        </Grid>
      )}
      {isTopicsError && <Alert severity="error">topics: server error</Alert>}
      {isTopicSuccess && (
        <List>
          {topics.map((topic) => (
            <Accordion key={topic.id} expanded={topicId === topic.id} onChange={handleChange(topic.id)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${topic.id}bh-content`}
                id={`${topic.id}-bh-header`}
              >
                <Typography className={classes.heading}>{topic.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {isWordLoading && <Typography>Loading words...</Typography>}
                {isWordError && <Alert severity="error">words: server error</Alert>}
                {isWordSuccess && !!words.length && (
                  <List className={classes.list}>
                    <ReactList itemRenderer={renderItem} length={words.length} type="uniform" />
                  </List>
                )}
                {isWordSuccess && !words.length && (
                  <Alert className={classes.width100} severity="info">
                    Words are missing.
                  </Alert>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </List>
      )}
    </Grid>
  );
};

export default React.memo(WordList);
