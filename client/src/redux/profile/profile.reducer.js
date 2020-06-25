import * as actionTypes from './profile.types';

const INITIAL_STATE = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case actionTypes.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
