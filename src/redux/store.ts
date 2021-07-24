import { configureStore as createStore } from '@reduxjs/toolkit';

import history from 'shared/history';
import { wordSlice } from 'redux/stores/wordsApi/wordSlice';
import { topicSlice } from 'redux/stores/topicsApi/topicSlice';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './stores/createRootReducer';

const rootReducer = createRootReducer(history);

const store = createStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([routerMiddleware(history), topicSlice.middleware, wordSlice.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
