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
    case actionTypes.UPDATE_LIKES_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId
            ? {
                ...post,
                likes: payload.likes
              }
            : post
        ),
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
