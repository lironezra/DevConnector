import { combineReducers } from 'redux';

import alertReducer from './alerts/alerts.reducer';
import authReducer from './auth/auth.reducer';
import profileReducer from './profile/profile.reducer';
import PostReducer from './post/post.reducer';

const appReducers = combineReducers({
  /* App top-level reducers */
  alerts: alertReducer,
  auth: authReducer,
  profile: profileReducer,
  post: PostReducer
});

const rootReducer = (state, action) => {
  return appReducers(state, action);
};

export default rootReducer;
