import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import betsReducer from './bet.reducer';
import errorsReducer from './errors.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  bets: betsReducer,
  errors: errorsReducer
});

export default rootReducer;
