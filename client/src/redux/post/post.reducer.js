import * as actionTypes from './post.types';

const INITIAL_STATE = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case actionTypes.POST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};

export default reducer;
