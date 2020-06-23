import uuid from 'uuid';
import * as actionTypes from './alerts.types';

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuid.v4();
  dispatch({
    type: actionTypes.SET_ALERT,
    payload: {
      msg,
      alertType,
      id
    }
  });

  setTimeout(
    () => dispatch({ type: actionTypes.REMOVE_ALERT, payload: id }),
    timeout
  );
};
