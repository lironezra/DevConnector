import uuid from 'uuid';
import * as actionTypes from './alerts.types';

const setAlert = (msg, alertType, id) => {
  return {
    type: actionTypes.SET_ALERT,
    payload: {
      msg,
      alertType,
      id
    }
  };
};

const removeAlert = (idToRemove) => {
  return { type: actionTypes.REMOVE_ALERT, payload: idToRemove };
};

export const displayAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuid.v4();
  dispatch(setAlert(msg, alertType, id));

  setTimeout(() => dispatch(removeAlert(id)), timeout);
};
