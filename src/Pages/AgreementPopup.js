// AgreementPopup.js
import React from 'react';

const AgreementPopup = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Agreement Policy</h3>
        <p>A User Agreement is an excellent addition to a website or mobile app for a number of reasons. It helps you set out the rules and requirements for users who visit your site or download your app.

This article will help you understand if a User Agreement is something you want, and if so, how to write and display your own.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AgreementPopup;

