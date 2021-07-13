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
import {Alert} from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import {useGetTopics} from 'redux/stores/topics/topicSlice';
import {usegetWordsByTopicId} from 'redux/stores/words/wordSlice';

import useStyles from './styles';

const WordList: React.FC = () => {
  const classes = useStyles();
  const {data: topicData, isSuccess: isTopicSuccess, isLoading: isTopicLoading, isError: isTopicsError} = useGetTopics(
    {}
  );
  const [topicId, setTopicId] = React.useState<string | false>(false);
  const {
    data: wordData,
    isSuccess: isWordSuccess,
    isLoading: isWordLoading,
    isError: isWordError,
  } = usegetWordsByTopicId(topicId || '');

  const words = wordData?.wordsByTopicId ?? [];
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setTopicId(isExpanded ? panel : false);
  };

  const topics = topicData?.topics ?? [];

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
          {topics.map(topic => (
            <Accordion expanded={topicId === topic.id} onChange={handleChange(topic.id)}>
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
                  <List className={classes.width100}>
                    {words.map(word => (
                      <ListItem divider key={word.word}>
                        <ListItemText id={word.word} primary={word.word} />
                        <ListItemSecondaryAction>
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
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