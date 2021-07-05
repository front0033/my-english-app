/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from 'react';

import {TextField, MenuItem, Grid, Typography, CircularProgress} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import {useGetTopics} from 'redux/stores/topics/topicSlice';

import useStyles from './styles';
import Words from './Words';

const MainPage = () => {
  const classes = useStyles();
  const {data, isSuccess: isTopicSuccess, isLoading: isTopicLoading, isError: isTopicsError} = useGetTopics({});
  const [topicId, setTopicId] = React.useState<string>('');

  const topics = data?.topics ?? [];

  React.useEffect(() => {
    if (isTopicSuccess) {
      setTopicId(topics.length ? topics[0].id : '');
    }
  }, [isTopicSuccess]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopicId(event.target.value);
  };

  return (
    <>
      {isTopicsError && <Alert severity="error">topics: server error</Alert>}
      {isTopicLoading && <CircularProgress />}
      {isTopicSuccess && (
        <Grid className={classes.container} container direction="column" justify="space-around" wrap="nowrap">
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
            {topics.map(topic => {
              const {name, id} = topic;
              return (
                <MenuItem key={name} value={id} id={`dictionary-${name}`}>
                  <Grid container wrap="nowrap" alignItems="center" justify="space-between">
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
