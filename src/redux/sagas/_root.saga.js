import { all } from 'redux-saga/effects';
import watchUserSaga from './user.saga';
import watchBetSaga from './bet.saga';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';

export default function* rootSaga() {
  yield all([
    watchUserSaga(),
    watchBetSaga(),
    loginSaga(),
    registrationSaga(),
    userSaga()
  ]);
}
