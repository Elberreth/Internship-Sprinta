import React from 'react';
import '../CSS/Agreement.css';

const AgreementPopup = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h1 className="main-title">User Agreement for Jambiz Alumni Portal</h1>
        <div>
          <h6>Acceptance of Terms</h6>
          <p>By using the service, you agree to comply with these user terms. If you do not agree to the terms, you should not use the service.</p>
        </div>
        <div>
          <h6>The Service</h6>
          <p>Jambiz provides a platform for users to [briefly describe the service]. We reserve the right to change or discontinue the service at any time and without notice.</p>
        </div>
        <div>
          <h6>User Information</h6>
          <p>By using the service, you consent to Jambiz collecting and using certain information about you, including personal data, in accordance with our privacy policy.</p>
        </div>
        <div>
          <h6>User Conduct</h6>
          <p>You are responsible for your behavior when using the service. You may not use the service in a manner that violates laws, regulations, or the rights of other users.</p>
        </div>
        <div>
          <h6>Content</h6>
          <p>Jambiz does not own the content you create or upload to the service, but by using the service, you grant us a license to use this content for the purpose of providing and improving the service.</p>
        </div>
        <div>
          <h6>Limitation of Liability</h6>
          <p>Jambiz is not liable for any losses or damages arising from the use of the service. We provide the service "as is" and "as available."</p>
        </div>
        <div>
          <h6>Changes to the Terms</h6>
          <p>We reserve the right to change these user terms at any time. Any changes will be posted on our website. Your continued use of the service after changes constitutes your acceptance of the new terms.</p>
        </div>
        <div>
          <p>By using our service, you acknowledge that you have read and understood these user terms and agree to comply with them.</p>
        </div>
        <button className="popup-btn-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AgreementPopup;








