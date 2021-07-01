import {takeLatest, put} from 'redux-saga/effects';
import apiClient from 'api/auth';
import {PayloadAction} from '@reduxjs/toolkit';
import {setUserInfo, getUserInfo, getUserError, IPostUserData} from './userSlice';

function* postUserDataAsync(action: PayloadAction<IPostUserData>) {
  try {
    const {password, username} = action.payload;

    const result = yield apiClient.login({username, password});
    const user = result.data;
    yield put(setUserInfo({user}));
  } catch (e) {
    yield put(getUserError(e));
  }
}

function* getAuthSaga() {
  yield takeLatest(getUserInfo, postUserDataAsync);
}

export default [getAuthSaga];
