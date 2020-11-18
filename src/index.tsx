/* eslint no-underscore-dangle: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import initStore from 'redux/initStore';
import store from 'redux/store';
import Logger from 'shared/utils/Logger';
import * as serviceWorker from './serviceWorker';
import App from './App';

function appRunner() {
  const logger = new Logger({severityLevel: 'error'});

  initStore(store);
  // Раскомментить, когда включим пинг
  // startSync(store);

  ReactDOM.render(<App store={store} logger={logger} />, document.getElementById('root'));
}

appRunner();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
