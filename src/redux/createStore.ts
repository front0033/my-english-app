import {Store} from 'redux';
import {configureStore as createStore} from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';
import {History} from 'history';
import {routerMiddleware} from 'connected-react-router';
import createRootReducer from './stores/createRootReducer';
import rootSaga from './stores/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const configureStore = (history: History): Store => {
  const rootReducer = createRootReducer(history);
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const store = createStore({
    reducer: rootReducer,
    middleware: middlewares,
  });

  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
