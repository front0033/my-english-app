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
  Typography,
} from '@material-ui/core';
import {useGetTopicsByIdQuery} from 'redux/stores/topics/topicSlice';
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
  [FieldsNames.expample]?: string;
  [FieldsNames.topicId]?: string;
}

const WordForm: React.FC = () => {
  const classes = useStyles();
  const {data, isLoading, error} = useGetTopicsByIdQuery({});

  const topics = data?.topics ?? [];

  const [fields, setFields] = React.useState<IFields>({word: '', translate: '', expample: '', topicId: ''});

  const handleChange = (fieldName: FieldsNames) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({...fields, [fieldName]: event.target.value});
  };

  const handleChangeSelect = (event: React.ChangeEvent<{value: unknown}>) => {
    setFields({...fields, [FieldsNames.topicId]: event.target.value as string});
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // eslint-disable-next-line no-console
    console.log(fields);
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      {isLoading && <LinearProgress />}
      {!!error && <Typography>Error</Typography>}
      <Grid container direction="column" alignContent="center" justify="center">
        <TextField
          id="word-field"
          className={classes.textField}
          label="word"
          value={fields.word}
          onChange={handleChange(FieldsNames.word)}
        />
        <TextField
          id="translate-field"
          className={classes.textField}
          label="translate"
          value={fields.translate}
          onChange={handleChange(FieldsNames.translate)}
        />
        <TextField
          id="example-field"
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
        <Button className={classes.submitButton} color="primary" variant="contained" size="large" type="submit">
          Save
        </Button>
      </Grid>
    </form>
  );
};

export default React.memo(WordForm);
