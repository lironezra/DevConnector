import { combineReducers } from 'redux';

import alertReducer from './alerts/alerts.reducer';

const appReducers = combineReducers({
  /* App top-level reducers */
  alerts: alertReducer
});

const rootReducer = (state, action) => {
  return appReducers(state, action);
};

export default rootReducer;
