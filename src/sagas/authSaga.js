import { takeLatest } from 'redux-saga/effects';

import authTypes from '../constants/actionTypes';
import { authApi } from '../api/index';
import { rootWorkerSaga } from './rootSaga';

const authSaga = [
  takeLatest(authTypes.login.request, rootWorkerSaga, authApi.defaultAPI),
  takeLatest(authTypes.register.request, rootWorkerSaga, authApi.defaultAPI),
  takeLatest(authTypes.forgotPassword.request, rootWorkerSaga, authApi.defaultAPI),
  takeLatest(authTypes.resetPassword.request, rootWorkerSaga, authApi.resetPassword),
];

export default authSaga;
