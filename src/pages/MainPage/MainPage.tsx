/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from 'react';

import {TextField, MenuItem, Grid, Typography} from '@material-ui/core';
import {useGetTopics} from 'redux/stores/topics/topicSlice';
import {usegetWordsByTopicId} from 'redux/stores/words/wordSlice';
import useStyles from './styles';

const MainPage = () => {
  const classes = useStyles();
  const {data} = useGetTopics({});
  const [topicId, setTopicId] = React.useState<string>('');
  const {data: wordsData} = usegetWordsByTopicId(topicId);
  const topics = data?.topics ?? [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const words = wordsData?.wordsByTopicId ?? [];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopicId(event.target.value);
  };

  return (
    <Grid container direction="column" alignItems="center" justify="center" style={{height: '81%'}}>
      <Grid
        className={classes.container}
        container
        direction="column"
        alignItems="center"
        justify="space-around"
        wrap="nowrap"
      >
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
      </Grid>
    </Grid>
  );
};

export default React.memo(MainPage);
