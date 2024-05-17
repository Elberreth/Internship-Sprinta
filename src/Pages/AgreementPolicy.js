import React from 'react';

const AgreementPolicy = ({ onClose }) => {
  return (
    <div className="agreement-popup">
      <div className="agreement-popup-content">
        <h3>Agreement Policy</h3>
        <p>
          User Agreement for [Jambiz]

          Please read this User Agreement carefully before using our service.

          Acceptance of Terms
          By using the service, you agree to comply with these user terms. If you do not agree to the terms, you should not use the service.

          The Service
          [Your Company Name] provides a platform for users to [briefly describe the service]. We reserve the right to change or discontinue the service at any time and without notice.

          User Information
          By using the service, you consent to [Your Company Name] collecting and using certain information about you, including personal data, in accordance with our privacy policy.

          User Conduct
          You are responsible for your behavior when using the service. You may not use the service in a manner that violates laws, regulations, or the rights of other users.

          Content
          [Your Company Name] does not own the content you create or upload to the service, but by using the service, you grant us a license to use this content for the purpose of providing and improving the service.

          Limitation of Liability
          [Your Company Name] is not liable for any losses or damages arising from the use of the service. We provide the service "as is" and "as available."

          Changes to the Terms
          We reserve the right to change these user terms at any time. Any changes will be posted on our website. Your continued use of the service after changes constitutes your acceptance of the new terms.

          By using our service, you acknowledge that you have read and understood these user terms and agree to comply with them.
        </p>
        <button onClick={onClose} className="btn-small">Close</button>
      </div>
    </div>
  );
};

export default AgreementPolicy;

