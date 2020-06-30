import * as actionTypes from './post.types';
import axios from 'axios';
import { displayAlert } from '../alerts/alerts.actions';

const getPostsSuccess = (posts) => {
  return {
    type: actionTypes.GET_POSTS_SUCCESS,
    payload: posts
  };
};

const getPostSuccess = (post) => {
  return {
    type: actionTypes.GET_POST_SUCCESS,
    payload: post
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

const deletePostSuccess = (postId) => {
  return {
    type: actionTypes.DELETE_POST_SUCCESS,
    payload: postId
  };
};

const addPostSuccess = (post) => {
  return {
    type: actionTypes.ADD_POSTS_SUCCESS,
    payload: post
  };
};

const addCommentSuccess = (comment) => {
  return {
    type: actionTypes.ADD_COMMENT_SUCCESS,
    payload: comment
  };
};

const removeCommentSuccess = (commentId) => {
  return {
    type: actionTypes.REMOVE_COMMENT_SUCCESS,
    payload: commentId
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
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postId}`);
    dispatch(deletePostSuccess(postId));
    dispatch(displayAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch(
      postError({
        msg: err.response.statusText,
        status: err.response.status
      })
    );
  }
};

// Delete a post
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/${postId}`);
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

// Add post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/posts', formData, config);
    dispatch(addPostSuccess(res.data));
    dispatch(displayAlert('Post Added', 'success'));
  } catch (err) {
    dispatch(
      postError({
        msg: err.response.statusText,
        status: err.response.status
      })
    );
  }
};

// Get post by id
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch(getPostSuccess(res.data));
  } catch (err) {
    dispatch(
      postError({
        msg: err.response.statusText,
        status: err.response.status
      })
    );
  }
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );
    dispatch(addCommentSuccess(res.data));
    dispatch(displayAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch(
      postError({
        msg: err.response.statusText,
        status: err.response.status
      })
    );
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch(removeCommentSuccess(commentId));
    dispatch(displayAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch(
      postError({
        msg: err.response.statusText,
        status: err.response.status
      })
    );
  }
};
