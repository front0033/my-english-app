import * as React from 'react';

import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Snackbar,
} from '@material-ui/core';
import {useGetTopics} from 'redux/stores/topics/topicSlice';
import {useParams, Redirect} from 'react-router-dom';
import {useAddWordMutation, useGetWordByIdQuery, useUpdateWordMutation} from 'redux/stores/words/wordSlice';
import {Alert} from '@material-ui/lab';
import routes from 'routes';

import useStyles from './styles';

enum FieldsNames {
  word = 'word',
  translate = 'translate',
  example = 'example',
  topicId = 'topicId',
}

export interface IFields {
  [FieldsNames.word]: string;
  [FieldsNames.translate]: string;
  [FieldsNames.example]: string;
  [FieldsNames.topicId]: string;
}

const initialFields = {word: '', translate: '', example: '', topicId: ''};

const WordForm: React.FC = () => {
  const classes = useStyles();
  const {wordId} = useParams<{wordId: string}>();
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [fields, setFields] = React.useState<IFields>(initialFields);

  // query
  const {data, isLoading, error, isSuccess: isTopicsSuccess} = useGetTopics({});
  const {
    data: wordData,
    isLoading: isWordLoading,
    isError: isWordError,
    isSuccess: isWordSuccess,
  } = useGetWordByIdQuery(wordId, {});

  // mutations
  const [addWord, {isLoading: savePending, isError: saveError}] = useAddWordMutation({});
  const [
    updateWord,
    {isLoading: updatePending, isError: updateError, isSuccess: updateSuccess},
  ] = useUpdateWordMutation({});

  const topics = data?.topics ?? [];

  React.useEffect(() => {
    if (wordData) {
      const {word, translate, example, topic} = wordData;
      setFields({word, translate, example, topicId: topic.id});
    }
  }, [isTopicsSuccess, isWordSuccess]);

  const handleChange = (fieldName: FieldsNames) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({...fields, [fieldName]: event.target.value});
  };

  const handleChangeSelect = (event: React.ChangeEvent<{value: unknown}>) => {
    setFields({...fields, [FieldsNames.topicId]: event.target.value as string});
  };

  const handleResetClick = () => {
    setFields(initialFields);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (wordId) {
      updateWord({id: wordId, ...fields}).then(() => {
        setFields({...initialFields, topicId: fields.topicId});
        setShowSnackbar(true);
      });
    } else {
      addWord(fields).then(() => {
        setFields({...initialFields, topicId: fields.topicId});
        setShowSnackbar(true);
      });
    }
  };

  const handleHideSnackBar = () => setShowSnackbar(false);

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Grid container direction="column" alignContent="center" justify="center" className={classes.container}>
        <TextField
          id="word-field"
          fullWidth
          required
          className={classes.textField}
          label="word"
          value={fields.word}
          onChange={handleChange(FieldsNames.word)}
        />
        <TextField
          id="translate-field"
          fullWidth
          required
          className={classes.textField}
          label="translate"
          value={fields.translate}
          onChange={handleChange(FieldsNames.translate)}
        />
        <TextField
          id="example-field"
          fullWidth
          className={classes.textField}
          label="example"
          value={fields.example}
          onChange={handleChange(FieldsNames.example)}
        />
        <FormControl className={classes.textField}>
          <InputLabel id="topic-field-label">Topic</InputLabel>
          <Select
            labelId="topic-field-label"
            id="topic-field"
            fullWidth
            required
            value={fields.topicId}
            autoWidth
            onChange={handleChangeSelect}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {topics.map(topic => (
              <MenuItem key={topic.name} value={topic.id}>
                {topic.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          className={classes.submitButton}
          color="primary"
          variant="contained"
          size="large"
          type="submit"
          disabled={savePending || !fields.word || !fields.translate || !fields.topicId}
        >
          Save
        </Button>
        <Button className={classes.submitButton} variant="outlined" size="large" onClick={handleResetClick}>
          Reset
        </Button>
        {(savePending || updatePending || isLoading || isWordLoading) && (
          <LinearProgress className={classes.progress} />
        )}
        {(error || isWordError || updateError) && (
          <Alert severity="error" className={classes.error}>
            topics: server error
          </Alert>
        )}
        {saveError && (
          <Alert severity="error" className={classes.error}>
            saving: server error
          </Alert>
        )}
        <Snackbar open={showSnackbar} autoHideDuration={1500} onClose={handleHideSnackBar}>
          <Alert severity="success">save word is susses</Alert>
        </Snackbar>
        {!!wordId && updateSuccess && <Redirect to={routes.words()} />}
      </Grid>
    </form>
  );
};

export default React.memo(WordForm);
