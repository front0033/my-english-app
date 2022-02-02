import { combineReducers } from '@reduxjs/toolkit';

import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import errorReducerName from './apiErrors/constants';
import errorReducer from './apiErrors/apiErrorsSlice';
import { authApi } from './auth/authApi';
import { userApi } from './user/userApi';
import { profileApi } from './userProfile/userProfileApi';
import profileReducer, { profileReducerPath } from './userProfile/userProfileSlice';
import { wordSlice as wordApiSlice } from './wordsApi/wordSlice';
import { topicSlice as topicApiSlice } from './topicsApi/topicSlice';
import topicReducer, { topicReducerName } from './topic';

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    [errorReducerName]: errorReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [profileReducerPath]: profileReducer,
    [topicApiSlice.reducerPath]: topicApiSlice.reducer,
    [topicReducerName]: topicReducer,
    [wordApiSlice.reducerPath]: wordApiSlice.reducer,
  });

export default createRootReducer;
