import React from 'react';
import { useSelector } from 'react-redux';

const Alert = () => {
  const alerts = useSelector((state) => state.alerts);
  let alertContent = null;

  if (alerts && alerts.length > 0) {
    alertContent = alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ));
  }
  return alertContent;
};

export default Alert;
