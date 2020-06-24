import axios from 'axios';
import { displayAlert } from '../alerts/alerts.actions';
import setAuthToken from '../../utils/setAuthToken';
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

const userLoaded = (user) => {
  return {
    type: actionTypes.USER_LOADED,
    payload: user
  };
};

const authError = () => {
  return {
    type: actionTypes.AUTH_ERROR
  };
};

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/users/secret');
    dispatch(userLoaded(res.data));
  } catch (err) {
    dispatch(authError());
  }
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
