import * as React from 'react';

import {TextField, Button, Grid} from '@material-ui/core';
import useStyles from './styles';

const TopicForm: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    // eslint-disable-next-line no-console
    console.log(value);
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
