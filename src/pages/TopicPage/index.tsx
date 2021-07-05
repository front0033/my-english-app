import * as React from 'react';

import {TextField, Button, Grid, LinearProgress} from '@material-ui/core';
import {useAddTopicMutation} from 'redux/stores/topics/topicSlice';
import {Alert} from '@material-ui/lab';
import useStyles from './styles';

const TopicForm: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [addTopic, {isLoading, isError}] = useAddTopicMutation({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTopic(value);
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      {isLoading && <LinearProgress />}
      {isError && <Alert severity="error">saving: server error</Alert>}
      <Grid container direction="column" alignContent="center" justify="center">
        <TextField
          id="topic-name-field"
          className={classes.textField}
          label="Topic name"
          variant="outlined"
          value={value}
          onChange={handleChange}
        />
        <Button className={classes.submitButton} color="primary" variant="contained" size="large" type="submit">
          Save
        </Button>
      </Grid>
    </form>
  );
};

export default React.memo(TopicForm);
