import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// eslint-disable-next-line @typescript-eslint/camelcase
import moduleName, {LOCAL_STORAGE_AUTH_KEY} from './constants';
import LoadStatuses from '../loadStatuses';

export interface IPostUserData {
  username: string;
  password: string;
}

const userSlice = createSlice({
  name: moduleName,
  initialState: {
    info: {},
    isAuthenticated: false,
    loadStatus: LoadStatuses.initial,
    menuOpen: true,
  },
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getUserInfo(state, _action: PayloadAction<IPostUserData>) {
      return {
        ...state,
        loadStatus: LoadStatuses.loading,
        isAuthenticated: false,
        info: {},
      };
    },
    setUserInfo(state, {payload}: PayloadAction<{user: any}>) {
      const userInfo = {...payload.user};

      return {
        ...state,
        info: {
          ...userInfo,
        },
        loadStatus: LoadStatuses.loadSuccess,
        isAuthenticated: true,
      };
    },

    setRole(state, action) {
      return {
        ...state,
        role: action.payload,
      };
    },

    getUserError(state, action) {
      localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
      return {
        ...state,
        loadStatus: LoadStatuses.error,
        error: action.payload,
        isAuthenticated: false,
        info: {},
        role: 'guest',
      };
    },
    logout(state) {
      localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
      return {
        ...state,
        info: {},
        loadStatus: LoadStatuses.initial,
        isAuthenticated: false,
        role: 'guest',
      };
    },
  },
});

export const {setUserInfo, getUserInfo, getUserError, logout, setRole} = userSlice.actions;

export default userSlice.reducer;
