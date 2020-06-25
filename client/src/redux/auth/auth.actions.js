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

const loginSuccess = (data) => {
  return {
    type: actionTypes.LOGIN_SUCCES,
    payload: data
  };
};

const loginFail = (data) => {
  return {
    type: actionTypes.LOGIN_FAIL
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

const logoutUser = () => {
  return {
    type: actionTypes.LOGOUT
  };
};

const clearProfile = () => {
  return {
    type: actionTypes.CLEAR_PROFILE
  };
};

// Load user - Get the user after getting the token from server
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

// Register user
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
    dispatch(loadUser());
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

// Login User
export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/users/signin', body, config);

    dispatch(loginSuccess(res.data));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data;

    console.log(errors);
    if (errors === 'Unauthorized') {
      dispatch(displayAlert('Invalid Credentials', 'danger'));
    } else {
      errors.forEach((error) =>
        dispatch(displayAlert(error.message, 'danger'))
      );
    }

    // if(errors && errors === 'Unauthorized')
    dispatch(loginFail());
  }
};

// Logout / Clear profile
export const logout = () => (dispatch) => {
  dispatch(logoutUser());
  dispatch(clearProfile());
};
