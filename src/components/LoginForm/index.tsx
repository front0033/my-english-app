import React from 'react';

import { Link } from 'react-router-dom';

import {
  TextField,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Alert } from '@material-ui/lab';
import * as yup from 'yup';
import { Formik } from 'formik';
import routes from 'routes';

import useStyles from './styles';

interface ILoginFormState {
  username: string;
  password: string;
}

const initialState: ILoginFormState = {
  username: '',
  password: '',
};

const REQUIRED_ERROR_MESSAGE = 'Поле должно быть заполнено';
const EMAIL_ERROR_MESSAGE = 'Логин должен быть в формате email';

const validationSchema: yup.SchemaOf<ILoginFormState> = yup.object().shape({
  username: yup.string().required(REQUIRED_ERROR_MESSAGE).email(EMAIL_ERROR_MESSAGE),
  password: yup.string().required(REQUIRED_ERROR_MESSAGE),
});

interface ILoginFormProps {
  isSignUp: boolean;
  onSubmit: (args: { email: string; password: string }) => void;
  isLoading: boolean;
  isError: boolean;
}

const LoginForm: React.FC<ILoginFormProps> = ({ isSignUp, isLoading, isError, onSubmit }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmitClick = async (values: ILoginFormState) => {
    const { username, password } = values;
    onSubmit({ email: username, password });
  };

  return (
    <div>
      <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={handleSubmitClick}>
        {({ values, errors, touched, isSubmitting, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} noValidate>
            <DialogTitle id="form-dialog-title">{isSignUp ? 'Регистрация' : 'Авторизация'}</DialogTitle>
            <DialogContent>
              <Grid container direction="column">
                <TextField
                  id="english-words-username"
                  name="username"
                  className={classes.textField}
                  variant="outlined"
                  placeholder="name.lastname@x5.ru"
                  onChange={handleChange}
                  value={values.username}
                  label="Имя пользователя"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  FormHelperTextProps={{
                    className: classes.helpText,
                  }}
                  error={touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                />
                <FormControl variant="outlined" className={classes.textField}>
                  <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                  <OutlinedInput
                    id="english-words-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange}
                    startAdornment={
                      <InputAdornment position="start">
                        <VpnKeyIcon />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                    error={touched.password && !!errors.password}
                  />
                </FormControl>
                {isError && (
                  <Alert className={classes.errorAlert} severity="error">
                    {isSignUp ? 'Пользователь уже существует' : 'Неправильный логин или пароль'}
                  </Alert>
                )}
              </Grid>
            </DialogContent>
            <DialogActions className={classes.actions}>
              <Grid container justifyContent="space-between" direction="row-reverse">
                <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                  {isSignUp ? 'Создать' : 'Вход'}
                </Button>
                {!isSignUp ? (
                  <Button variant="outlined" color="primary" component={Link} to={routes.signUp()}>
                    Зарегистрироваться
                  </Button>
                ) : (
                  <Button variant="outlined" color="primary" component={Link} to={routes.signIn()}>
                    Войти
                  </Button>
                )}
              </Grid>
            </DialogActions>
          </form>
        )}
      </Formik>

      {isLoading && (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      )}
    </div>
  );
};

export default React.memo(LoginForm);
