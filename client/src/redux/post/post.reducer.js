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
    case actionTypes.GET_POST_SUCCESS:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case actionTypes.ADD_POSTS_SUCCESS:
      return {
        ...state,
        posts: [payload, ...state.posts],
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
    case actionTypes.DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false
      };
    case actionTypes.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false
      };
    case actionTypes.REMOVE_COMMENT_SUCCESS: {
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          )
        },
        loading: false
      };
    }
    default:
      return state;
  }
};

export default reducer;
