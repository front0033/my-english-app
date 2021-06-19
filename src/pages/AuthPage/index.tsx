import React from 'react';

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
} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {useDispatch, useSelector} from 'react-redux';
import {getUserInfo} from 'redux/stores/user/userSlice';
import {UserState} from 'redux/stores/user/types';
import {State} from 'redux/stores/types';

import LoadStatuses from 'redux/stores/loadStatuses';
import useStyles from './styles';

interface IAuthDialogProps {}

interface IAuthDialogState {
  login: string;
  password: string;
  showPassword: boolean;
}

const AuthDialog: React.FC<IAuthDialogProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector<State, UserState>(state => state.user);
  const [userData, setUserData] = React.useState<IAuthDialogState>({
    login: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (field: 'login' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [field]: e.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setUserData({...userData, showPassword: !userData.showPassword});
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmitClick = (e: {preventDefault: () => void}) => {
    e.preventDefault();
    dispatch(getUserInfo({username: userData.login, password: userData.password}));
  };

  return (
    <div>
      <form onSubmit={handleSubmitClick}>
        <DialogTitle id="form-dialog-title">Авторизация</DialogTitle>
        <DialogContent>
          <Grid container direction="column">
            <TextField
              className={classes.textField}
              variant="outlined"
              placeholder="username@x5.ru"
              onChange={handleChange('login')}
              value={userData.login}
              label="Имя пользователя"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl variant="outlined" className={classes.textField}>
              <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={userData.showPassword ? 'text' : 'password'}
                value={userData.password}
                onChange={handleChange('password')}
                startAdornment={
                  // eslint-disable-next-line react/jsx-wrap-multilines
                  <InputAdornment position="start">
                    <VpnKeyIcon />
                  </InputAdornment>
                }
                endAdornment={
                  // eslint-disable-next-line react/jsx-wrap-multilines
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {userData.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            {user.loadStatus === LoadStatuses.error && (
              <Alert className={classes.errorAlert} severity="error">
                Неправильный логин или пароль
              </Alert>
            )}
          </Grid>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button variant="contained" color="primary" type="submit">
            Вход
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default React.memo(AuthDialog);
