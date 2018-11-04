import { all, call, put } from 'redux-saga/effects';
import authSaga from './authSaga';

export default function* rootSaga() {
  yield all([...authSaga]);
}

export const actionTypeFormatter = type => type.slice(0, type.indexOf('REQUEST') - 1);

export function* rootWorkerSaga(apifunc, action) {
  const { params, response, error } = yield call(apifunc, action.payload);
  if (response) {
    if (response.data.success !== 'true') {
      const payload = { error: response.data, request: params };
      yield put({
        type: `${actionTypeFormatter(action.type)}_FAILURE`,
        payload,
      });
    } else {
      const payload = { request: params, response: response.data };
      console.log(payload);
      yield put({
        type: `${actionTypeFormatter(action.type)}_SUCCESS`,
        payload,
      });
    }
  } else if (error.status !== 0) {
    const payload = { error: error.data, request: params };
    yield put({
      type: `${actionTypeFormatter(action.type)}_FAILURE`,
      payload,
    });
  } else if (error.status === 0) {
    yield put({ type: 'NO_INTERNET_ERROR' });
  }
}
