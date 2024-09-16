import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

function* loginUser(action) {
  try {
    const response = yield call(axios.post, '/api/user/login', action.payload);
    yield put({ type: 'LOGIN_SUCCESS', payload: response.data });
  } catch (error) {
    yield put({ type: 'LOGIN_FAILURE', error: error.message });
  }
}

function* watchUserSaga() {
  yield takeLatest('LOGIN_REQUEST', loginUser);
}

export default watchUserSaga;
