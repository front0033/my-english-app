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
import {useAddWordMutation} from 'redux/stores/words/wordSlice';
import {Alert} from '@material-ui/lab';
import useStyles from './styles';

enum FieldsNames {
  word = 'word',
  translate = 'translate',
  expample = 'expample',
  topicId = 'topicId',
}

export interface IFields {
  [FieldsNames.word]: string;
  [FieldsNames.translate]: string;
  [FieldsNames.expample]: string;
  [FieldsNames.topicId]: string;
}

const initialFields = {word: '', translate: '', expample: '', topicId: ''};

const WordForm: React.FC = () => {
  const classes = useStyles();
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const {data, isLoading, error} = useGetTopics({});
  const [addWord, {isLoading: savePending, isError: saveError}] = useAddWordMutation({});

  const topics = data?.topics ?? [];

  const [fields, setFields] = React.useState<IFields>(initialFields);

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

    addWord(fields).then(() => {
      setFields({...initialFields, topicId: fields.topicId});
      setShowSnackbar(true);
    });
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
          value={fields.expample}
          onChange={handleChange(FieldsNames.expample)}
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
        {savePending && <LinearProgress className={classes.progress} />}
        {error && (
          <Alert severity="error" className={classes.error}>
            topics: server error
          </Alert>
        )}
        {isLoading && <LinearProgress className={classes.progress} />}
        {saveError && (
          <Alert severity="error" className={classes.error}>
            saving: server error
          </Alert>
        )}
        <Snackbar open={showSnackbar} autoHideDuration={1500} onClose={handleHideSnackBar}>
          <Alert severity="success">save word is susses</Alert>
        </Snackbar>
      </Grid>
    </form>
  );
};

export default React.memo(WordForm);
