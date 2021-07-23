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
  CircularProgress,
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
  const [topicId, setTopicId] = React.useState<string | false>(false);

  const {
    data: topicData,
    isSuccess: isTopicSuccess,
    isLoading: isTopicLoading,
    isError: isTopicsError,
  } = useGetTopicsQuery({});
  const {
    data: wordData,
    isSuccess: isWordSuccess,
    isLoading: isWordLoading,
    isError: isWordError,
  } = useGetWordsByTopicIdQuery(topicId || '', { skip: !topicId });

  const [deleteWordById] = useDeleteWordMutation();

  const deleteWord = (id: string) => () => {
    deleteWordById(id);
  };

  const handleChange = (panel: string) => (_event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setTopicId(isExpanded ? panel : false);
  };

  const words = wordData || [];
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
          text={`Do you exactly want to delete «${words[index].word}?»`}
          action={deleteWord(words[index].id)}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );

  const isSameTopicId = (id: string): boolean => topicId === id;

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
                {isWordLoading && (
                  <Grid container justifyContent="center">
                    <CircularProgress className={classes.progress} />
                  </Grid>
                )}
                {isSameTopicId(topic.id) && isWordError && <Alert severity="error">words: server error</Alert>}
                {isSameTopicId(topic.id) && isWordSuccess && !!words.length && (
                  <List className={classes.list}>
                    <ReactList key={topic.id} itemRenderer={renderItem} length={words.length} type="uniform" />
                  </List>
                )}
                {isSameTopicId(topic.id) && isWordSuccess && !words.length && (
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
