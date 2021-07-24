import { combineReducers } from '@reduxjs/toolkit';

import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import errorReducerName from './apiErrors/constants';
import errorReducer from './apiErrors/apiErrorsSlice';
import { wordSlice as wordApiSlice } from './wordsApi/wordSlice';
import { topicSlice as topicApiSlice } from './topicsApi/topicSlice';
import topicReducer, { topicReducerName } from './topic';

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    [errorReducerName]: errorReducer,
    [topicApiSlice.reducerPath]: topicApiSlice.reducer,
    [topicReducerName]: topicReducer,
    [wordApiSlice.reducerPath]: wordApiSlice.reducer,
  });

export default createRootReducer;
