import { Store } from 'redux';
import { configureStore as createStore } from '@reduxjs/toolkit';

import { History } from 'history';
import { wordSlice } from 'redux/stores/words/wordSlice';
import { topicSlice } from 'redux/stores/topics/topicSlice';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './stores/createRootReducer';

const configureStore = (history: History): Store => {
  const rootReducer = createRootReducer(history);

  const store = createStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([routerMiddleware(history), topicSlice.middleware, wordSlice.middleware]),
  });

  return store;
};

export default configureStore;
