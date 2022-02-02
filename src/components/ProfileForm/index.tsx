import React from 'react';

import { Redirect } from 'react-router-dom';
import {
  TextField,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import * as yup from 'yup';
import { Formik } from 'formik';

import useStyles from './styles';

interface IProfileFormState {
  firstName: string;
  lastName?: string;
  username: string;
}

const initialState: IProfileFormState = {
  firstName: '',
  lastName: '',
  username: '',
};

const REQUIRED_ERROR_MESSAGE = 'Поле должно быть заполнено';

const validationSchema: yup.SchemaOf<IProfileFormState> = yup.object().shape({
  firstName: yup.string().required(REQUIRED_ERROR_MESSAGE),
  lastName: yup.string(),
  username: yup.string().required(REQUIRED_ERROR_MESSAGE),
});

interface ILoginFormProps {
  initialValues: IProfileFormState | undefined;
  onSubmit: (args: Required<IProfileFormState>) => void;
  isLoading: boolean;
  isError: boolean;
  isSussess: boolean;
  successRedurectUrl: string;
}

const ProfileForm: React.FC<ILoginFormProps> = ({
  initialValues,
  isLoading,
  isError,
  onSubmit,
  isSussess,
  successRedurectUrl,
}) => {
  const classes = useStyles();

  const handleSubmitClick = async (values: IProfileFormState) => {
    const { firstName, lastName = '', username } = values;
    onSubmit({ firstName, lastName, username });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues || initialState}
        validationSchema={validationSchema}
        onSubmit={handleSubmitClick}
      >
        {({ values, errors, touched, isSubmitting, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} noValidate>
            <DialogTitle id="form-dialog-title">Профиль</DialogTitle>
            <DialogContent>
              <Grid container direction="column">
                <TextField
                  required
                  name="firstName"
                  className={classes.textField}
                  variant="outlined"
                  placeholder="Введите имя"
                  onChange={handleChange}
                  value={values.firstName}
                  label="Имя"
                  error={touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                />
                <TextField
                  name="lastName"
                  className={classes.textField}
                  variant="outlined"
                  placeholder="Введите фамилию"
                  onChange={handleChange}
                  value={values.lastName}
                  label="Фамилия"
                  FormHelperTextProps={{
                    className: classes.helpText,
                  }}
                  error={touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                />
                <TextField
                  required
                  name="username"
                  className={classes.textField}
                  variant="outlined"
                  placeholder="введите логин"
                  onChange={handleChange}
                  value={values.username}
                  label="Имя пользователя"
                  FormHelperTextProps={{
                    className: classes.helpText,
                  }}
                  error={touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                />
                {isError && (
                  <Alert className={classes.errorAlert} severity="error">
                    Ошибка сохранения
                  </Alert>
                )}
              </Grid>
            </DialogContent>
            <DialogActions className={classes.actions}>
              <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                Сохранить
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
      {isLoading && (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      )}
      {isSussess && <Redirect to={successRedurectUrl} />}
    </div>
  );
};

export default React.memo(ProfileForm);
