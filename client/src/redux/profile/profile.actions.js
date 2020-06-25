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
