import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

function* fetchActiveBets() {
  try {
    const response = yield call(axios.get, '/api/bets/active');
    yield put({ type: 'SET_ACTIVE_BETS', payload: response.data });
  } catch (error) {
    yield put({ type: 'BET_OPERATION_FAILURE', error: error.message });
  }
}

function* addBet(action) {
  try {
    yield call(axios.post, '/api/bets', action.payload);
    yield put({ type: 'FETCH_ACTIVE_BETS_REQUEST' }); 
  } catch (error) {
    yield put({ type: 'BET_OPERATION_FAILURE', error: error.message });
  }
}

function* updateBet(action) {
  try {
    const { id, updatedBetData } = action.payload;
    const response = yield call(axios.put, `/api/bets/${id}`, updatedBetData);
    yield put({ type: 'UPDATE_BET_SUCCESS', payload: response.data }); 
  } catch (error) {
    yield put({ type: 'BET_OPERATION_FAILURE', error: error.message });
  }
}

function* deleteBet(action) {
  try {
    const betId = action.payload;
    yield call(axios.delete, `/api/bets/${betId}`);
    yield put({ type: 'FETCH_ACTIVE_BETS_REQUEST' }); 
  } catch (error) {
    yield put({ type: 'BET_OPERATION_FAILURE', error: error.message });
  }
}

function* watchBetSaga() {
  yield takeLatest('FETCH_ACTIVE_BETS_REQUEST', fetchActiveBets);
  yield takeLatest('ADD_BET_REQUEST', addBet);
  yield takeLatest('UPDATE_BET_REQUEST', updateBet)
  yield takeLatest('DELETE_BET_REQUEST', deleteBet);
}

export default watchBetSaga;

