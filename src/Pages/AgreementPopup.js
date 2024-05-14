// AgreementPopup.js
import React from 'react';

const AgreementPopup = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Agreement Policy</h3>
        <p>Här kommer innehållet i din agreement policy...</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AgreementPopup;

