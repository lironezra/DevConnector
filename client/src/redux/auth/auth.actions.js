import axios from 'axios';
import { displayAlert } from '../alerts/alerts.actions';
import * as actionTypes from './auth.types';

const registerSuccess = (data) => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    payload: data
  };
};

const registerFail = () => {
  return {
    type: actionTypes.REGISTER_FAIL
  };
};

export const signUp = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users/signup', body, config);

    dispatch(registerSuccess(res.data));
  } catch (err) {
    const errors = err.response.data;

    if (errors) {
      errors.forEach((error) =>
        dispatch(displayAlert(error.message, 'danger'))
      );
    }
    dispatch(registerFail());
  }
};
