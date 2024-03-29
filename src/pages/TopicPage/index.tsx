import * as React from 'react';

import { TextField, Button, Grid, LinearProgress, Snackbar } from '@material-ui/core';
import {
  useAddTopicMutation,
  useGetTopicQuery,
  useGetTopicsQuery,
  useUpdateTopicMutation,
} from 'redux/stores/topicsApi/topicSlice';
import { Alert } from '@material-ui/lab';
import { useParams, Redirect } from 'react-router-dom';
import routes from 'routes';
import { useAppSelector } from 'redux/hooks';

import useStyles from './styles';

const defaultValue = '';

const TopicForm: React.FC = () => {
  const classes = useStyles();
  const { topicId } = useParams<{ topicId: string }>();
  const [value, setValue] = React.useState(defaultValue);
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const { user } = useAppSelector((store) => store.profile.userProfile) || {};
  const { isLoading: isTopicsLoading } = useGetTopicsQuery(user?.userId ?? '', { skip: !user });
  const [addTopic, { isLoading, isError }] = useAddTopicMutation({});
  const [updateTopic, { isLoading: isUpdating, isError: isUpdateError, isSuccess }] = useUpdateTopicMutation({});

  const { data: editedTopic, isLoading: isWordLoading, isError: isGetTopicError } = useGetTopicQuery(
    { id: topicId, userId: user?.userId ?? '' },
    {
      skip: !topicId || !user,
    }
  );

  React.useEffect(() => {
    if (editedTopic) {
      setValue(editedTopic.name);
    }
  }, [editedTopic]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleResetClick = () => {
    setValue(defaultValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (topicId) {
      updateTopic({ id: topicId, userId: user?.userId ?? '', name: value }).then(() => {
        setShowSnackbar(true);
      });
    } else {
      addTopic({ name: value, userId: user?.userId ?? '' }).then(() => {
        handleResetClick();
        setShowSnackbar(true);
      });
    }
  };

  const handleHideSnackBar = () => setShowSnackbar(false);

  return React.useMemo(
    () => (
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container direction="column" alignContent="center" justifyContent="center" className={classes.container}>
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
          {(isLoading || isUpdating || isWordLoading || isTopicsLoading) && (
            <LinearProgress className={classes.progress} />
          )}
          {(isError || isUpdateError) && (
            <Alert severity="error" className={classes.error}>
              saving: server error
            </Alert>
          )}
          {isGetTopicError && (
            <Alert severity="error" className={classes.error}>
              get topic: server error
            </Alert>
          )}
          <Snackbar open={showSnackbar} autoHideDuration={1500} onClose={handleHideSnackBar}>
            <Alert severity="success">save topic is susses</Alert>
          </Snackbar>
          {!!topicId && isSuccess && <Redirect to={routes.topics()} />}
        </Grid>
      </form>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      isGetTopicError,
      isError,
      isLoading,
      isSuccess,
      isTopicsLoading,
      isUpdateError,
      isUpdating,
      isWordLoading,
      showSnackbar,
      value,
    ]
  );
};

export default React.memo(TopicForm);
