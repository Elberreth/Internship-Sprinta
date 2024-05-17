// ErrorAlert.js
import React from 'react';

const ErrorAlert = ({ message }) => {
  return (
    <div className="alert alert-danger mt-2" role="alert">
      {message}
    </div>
  );
}

export default ErrorAlert;
