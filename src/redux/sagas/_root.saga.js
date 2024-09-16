import { all } from 'redux-saga/effects';
import watchUserSaga from './user.saga';
import watchBetSaga from './bet.saga';

export default function* rootSaga() {
  yield all([
    watchUserSaga(),
    watchBetSaga(),
  ]);
}
