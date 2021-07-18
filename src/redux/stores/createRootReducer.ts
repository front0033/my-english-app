import { combineReducers } from '@reduxjs/toolkit';

import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import { wordSlice } from 'redux/stores/words/wordSlice';
import errorReducerName from './apiErrors/constants';
import errorReducer from './apiErrors/apiErrorsSlice';
import { topicSlice } from './topics/topicSlice';

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    [errorReducerName]: errorReducer,
    [topicSlice.reducerPath]: topicSlice.reducer,
    [wordSlice.reducerPath]: wordSlice.reducer,
  });

export default createRootReducer;
