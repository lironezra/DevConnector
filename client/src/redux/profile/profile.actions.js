import axios from 'axios';
import { displayAlert } from '../alerts/alerts.actions';

import * as actionTypes from './profile.types';

const getProfile = (profileData) => {
  return {
    type: actionTypes.GET_PROFILE_SUCCESS,
    payload: profileData
  };
};

const profileError = (error) => {
  return {
    type: actionTypes.PROFILE_ERROR,
    payload: error
  };
};

// Get the current user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch(getProfile(res.data));
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

    dispatch(getProfile(res.data));
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

// Add
