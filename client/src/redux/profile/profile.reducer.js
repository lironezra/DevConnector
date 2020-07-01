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
    case actionTypes.UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case actionTypes.GET_PROFILES_SUCCESS:
      return {
        ...state,
        profiles: payload,
        loading: false,
        error: null
      };
    case actionTypes.GET_REPOS_SUCCESS:
      return {
        ...state,
        repos: payload,
        loading: false
      };
    case actionTypes.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
    case actionTypes.CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
        error: null
      };
    default:
      return state;
  }
};

export default reducer;
