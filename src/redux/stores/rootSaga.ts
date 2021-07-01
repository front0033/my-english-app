import {all} from 'redux-saga/effects';

import authSaga from './user/sagas';

const sagas = [...authSaga];

export default function* root() {
  yield all(sagas.map(saga => saga()));
}
