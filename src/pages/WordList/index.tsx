import * as React from 'react';

import {
  Grid,
  List,
  Typography,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useGetTopicsQuery } from 'redux/stores/topicsApi/topicSlice';
import { setTopicId as setTopicIdAction } from 'redux/stores/topic';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import WordListByTopicId from './list';

import useStyles from './styles';

const WordList: React.FC = () => {
  const classes = useStyles();
  const { topicId } = useAppSelector((store) => store.topic);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.profile.userProfile) || {};
  const {
    data: topicData,
    isSuccess: isTopicSuccess,
    isLoading: isTopicLoading,
    isError: isTopicsError,
  } = useGetTopicsQuery(user?.userId ?? '', { skip: !user });

  const handleChange = (panel: string) => (_event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    dispatch(setTopicIdAction(isExpanded ? panel : false));
  };

  const topics = topicData || [];

  return React.useMemo(
    () => (
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
        {isTopicSuccess && !topics.length && (
          <Alert severity="info" className={classes.emptyDataAlert}>
            Topics are missing. Please press +
          </Alert>
        )}
        {isTopicSuccess && !!topics.length && (
          <List>
            {topics.map((topic) => (
              <Accordion key={topic.id} expanded={topicId === topic.id} onChange={handleChange(topic.id)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${topic.id}-bh-content`}
                  id={`${topic.id}-bh-header`}
                >
                  <Typography className={classes.heading}>{topic.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>{topicId === topic.id && <WordListByTopicId topicId={topicId} />}</AccordionDetails>
              </Accordion>
            ))}
          </List>
        )}
      </Grid>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isTopicLoading, isTopicsError, isTopicSuccess, topics, topicId]
  );
};

export default WordList;
