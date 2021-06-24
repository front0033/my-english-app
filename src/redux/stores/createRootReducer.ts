import {combineReducers} from '@reduxjs/toolkit';

import {History} from 'history';
import {connectRouter} from 'connected-react-router';
import errorReducerName from './apiErrors/constants';
import errorReducer from './apiErrors/apiErrorsSlice';
import userModuleName from './user/constants';
import userReducer from './user/userSlice';

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    [errorReducerName]: errorReducer,
    [userModuleName]: userReducer,
  });

export default createRootReducer;