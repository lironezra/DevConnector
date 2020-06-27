import axios from 'axios';
import { displayAlert } from '../alerts/alerts.actions';
import { accountDeleted } from '../auth/auth.actions';

import * as actionTypes from './profile.types';

const getProfileSuccess = (profileData) => {
  return {
    type: actionTypes.GET_PROFILE_SUCCESS,
    payload: profileData
  };
};

const getProfilesSuccess = (profiles) => {
  return {
    type: actionTypes.GET_PROFILES_SUCCESS,
    payload: profiles
  };
};

const getReposSuccess = (repos) => {
  return {
    type: actionTypes.GET_REPOS_SUCCESS,
    payload: repos
  };
};

const updateProfile = (profileData) => {
  return {
    type: actionTypes.UPDATE_PROFILE,
    payload: profileData
  };
};

const profileError = (error) => {
  return {
    type: actionTypes.PROFILE_ERROR,
    payload: error
  };
};

export const clearProfile = () => {
  return {
    type: actionTypes.CLEAR_PROFILE
  };
};

// Get the current user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch(getProfileSuccess(res.data));
  } catch (err) {
    dispatch(
      profileError({
        msg: err.response.statusText,
        status: err.response.status
      })
    );
  }
};

// Get all Profiles
export const getAllProfiles = () => async (dispatch) => {
  dispatch(clearProfile());

  try {
    const res = await axios.get('/api/profile');
    dispatch(getProfilesSuccess(res.data));
  } catch (err) {
    dispatch(
      profileError({
        msg: err.response.statusText,
        status: err.response.status
      })
    );
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch(getProfileSuccess(res.data));
  } catch (err) {
    dispatch(
      profileError({
        msg: err.response.statusText,
        status: err.response.status
      })
    );
  }
};

// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch(getReposSuccess(res.data));
  } catch (err) {
    dispatch(
      profileError({
        msg: err.response.statusText,
        status: err.response.status
      })
    );
  }
};

// Create or Update Profile
export const createProfile = (formdata, history, edit = false) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/profile', formdata, config);

    dispatch(getProfileSuccess(res.data));
    dispatch(
      displayAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
    );

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data;

    if (errors) {
      errors.forEach((error) =>
        dispatch(displayAlert(error.message, 'danger'))
      );
    }

    dispatch(
      profileError({
        msg: err.response.statusText,
        status: err.response.status
      })
    );
  }
};

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put('/api/profile/experience', formData, config);

    dispatch(updateProfile(res.data));
    dispatch(displayAlert('Experience Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data;

    if (errors) {
      errors.forEach((error) =>
        dispatch(displayAlert(error.message, 'danger'))
      );
    }

    dispatch(
      profileError({
        msg: err.response.statusText,
        status: err.response.status
      })
    );
  }
};

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put('/api/profile/education', formData, config);

    dispatch(updateProfile(res.data));
    dispatch(displayAlert('Education Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data;

    if (errors) {
      errors.forEach((error) =>
        dispatch(displayAlert(error.message, 'danger'))
      );
    }

    dispatch(
      profileError({
        msg: err.response.statusText,
        status: err.response.status
      })
    );
  }
};

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch(updateProfile(res.data));
    dispatch(displayAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch(
      profileError({
        msg: err.response.statusText,
        status: err.response.status
      })
    );
  }
};

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch(updateProfile(res.data));
    dispatch(displayAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch(
      profileError({
        msg: err.response.statusText,
        status: err.response.status
      })
    );
  }
};

// Delete Account
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Aru you sure? This can NOT be undone!')) {
    try {
      await axios.delete(`/api/profile`);

      dispatch(clearProfile());
      dispatch(accountDeleted());

      dispatch(displayAlert('Your account has been permanently deleted'));
    } catch (err) {
      dispatch(
        profileError({
          msg: err.response.statusText,
          status: err.response.status
        })
      );
    }
  }
};
