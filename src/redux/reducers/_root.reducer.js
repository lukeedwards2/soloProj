import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import betsReducer from './bet.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  bets: betsReducer,
});

export default rootReducer;
