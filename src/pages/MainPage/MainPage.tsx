/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from 'react';

import { TextField, MenuItem, Grid, Typography, LinearProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useGetTopicsQuery } from 'redux/stores/topicsApi/topicSlice';
import { useAppSelector } from 'redux/hooks';

import useStyles from './styles';
import Words from './Words';

const MainPage = () => {
  const classes = useStyles();
  const { user } = useAppSelector((store) => store.profile.userProfile) || {};
  const {
    data,
    isSuccess: isTopicSuccess,
    isLoading: isTopicLoading,
    isError: isTopicsError,
  } = useGetTopicsQuery(user?.userId ?? '', { skip: !user });
  const [topicId, setTopicId] = React.useState<string>('');

  const topics = data || [];

  React.useEffect(() => {
    if (isTopicSuccess) {
      setTopicId(topics.length ? topics[0].id : '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTopicSuccess]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopicId(event.target.value);
  };

  return (
    <>
      {isTopicsError && <Alert severity="error">topics: server error</Alert>}
      {isTopicLoading && (
        <Grid container direction="column" alignItems="center" className={classes.progressContainer}>
          <Typography className={classes.progressCaption} variant="caption">
            Loading topics...
          </Typography>
          <LinearProgress className={classes.progress} />
        </Grid>
      )}
      {isTopicSuccess && !topics.length && (
        <Alert severity="info" className={classes.emptyDataAlert}>
          Topics are missing. Please press +
        </Alert>
      )}
      {isTopicSuccess && !!topicId && (
        <Grid className={classes.container} container direction="column" wrap="nowrap">
          <TextField
            variant="outlined"
            className={classes.select}
            label="please select dictionary"
            size="small"
            margin="dense"
            select
            onChange={handleChange}
            value={topicId}
            id="business-rules-filter-select-is_summable"
          >
            {topics.map((topic) => {
              const { name, id } = topic;
              return (
                <MenuItem key={id} value={id} id={`dictionary-${name}`}>
                  <Grid container wrap="nowrap" alignItems="center" justifyContent="space-between">
                    <Typography>{name}</Typography>
                  </Grid>
                </MenuItem>
              );
            })}
          </TextField>
          {topicId && <Words topicId={topicId} />}
        </Grid>
      )}
    </>
  );
};

export default React.memo(MainPage);
