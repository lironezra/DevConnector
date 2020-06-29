import * as actionTypes from './post.types';
import axios from 'axios';
import { displayAlert } from '../alerts/alerts.actions';

const getPostsSuccess = (posts) => {
  return {
    type: actionTypes.GET_POSTS_SUCCESS,
    payload: posts
  };
};

const postError = (error) => {
  return {
    type: actionTypes.POST_ERROR,
    payload: error
  };
};

const updateLikesSuccecss = (postId, likes) => {
  return {
    type: actionTypes.UPDATE_LIKES_SUCCESS,
    payload: { postId, likes }
  };
};

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');
    dispatch(getPostsSuccess(res.data));
  } catch (err) {
    dispatch(
      postError({
        msg: err.response.statusText,
        status: err.response.status
      })
    );
  }
};

// Add like
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);
    dispatch(updateLikesSuccecss(postId, res.data));
  } catch (err) {
    dispatch(
      postError({
        msg: err.response.statusText,
        status: err.response.status
      })
    );
  }
};

// Remove like
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);
    dispatch(updateLikesSuccecss(postId, res.data));
  } catch (err) {
    dispatch(
      postError({
        msg: err.response.statusText,
        status: err.response.status
      })
    );
  }
};
