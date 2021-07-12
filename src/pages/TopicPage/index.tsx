import * as React from 'react';

import {TextField, Button, Grid, LinearProgress, Snackbar} from '@material-ui/core';
import {useAddTopicMutation, useGetTopics} from 'redux/stores/topics/topicSlice';
import {Alert} from '@material-ui/lab';
import useStyles from './styles';

const defaultValue = '';

const TopicForm: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(defaultValue);
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [addTopic, {isLoading, isError}] = useAddTopicMutation({});
  const {refetch: refetchTopics} = useGetTopics({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleResetClick = () => {
    setValue(defaultValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTopic(value).then(() => {
      handleResetClick();
      refetchTopics();
      setShowSnackbar(true);
    });
  };

  const handleHideSnackBar = () => setShowSnackbar(false);

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Grid container direction="column" alignContent="center" justify="center" className={classes.container}>
        <TextField
          id="topic-name-field"
          fullWidth
          required
          className={classes.textField}
          label="Topic name"
          variant="outlined"
          value={value}
          onChange={handleChange}
        />
        <Button
          className={classes.submitButton}
          color="primary"
          variant="contained"
          size="large"
          type="submit"
          disabled={isLoading || !value}
        >
          Save
        </Button>
        <Button className={classes.submitButton} variant="outlined" size="large" onClick={handleResetClick}>
          Reset
        </Button>
        {isLoading && <LinearProgress className={classes.progress} />}
        {isError && (
          <Alert severity="error" className={classes.error}>
            saving: server error
          </Alert>
        )}
        <Snackbar open={showSnackbar} autoHideDuration={1500} onClose={handleHideSnackBar}>
          <Alert severity="success">save topic is susses</Alert>
        </Snackbar>
      </Grid>
    </form>
  );
};

export default React.memo(TopicForm);
