import React, { useState } from 'react';
import '../CSS/Register.css'; 

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    agreement: false 
  });

  const [errors, setErrors] = useState({});
  const [showAgreementPopup, setShowAgreementPopup] = useState(false); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.username) formErrors.username = 'Username is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.password) formErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) formErrors.confirmPassword = 'Passwords do not match';
    if (!formData.company) formErrors.company = 'Company is required';
    if (!formData.agreement) formErrors.agreement = 'You must accept the agreement policy';
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      console.log('Form data:', formData);
      // Skicka e-postlogik här
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="register-page">
      <div className="register-form-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <select id="company" name="company" value={formData.company} onChange={handleChange}>
              <option value="">Select Company</option>
              <option value="XBUS">XBUS</option>
              <option value="EXCEED">EXCEED</option>
              <option value="Sprinta">Sprinta</option>
              <option value="Progress Lead">Progress Lead</option>
              <option value="Addends">Addends</option>
              <option value="Podium">Podium</option>
              <option value="Analytic Lead">Analytic Lead</option>
              <option value="LearningLead">LearningLead</option>
              <option value="SwCG">SwCG</option>
            </select>
            {errors.company && <span className="error">{errors.company}</span>}
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
              />
              {' '}
              Do you accept the Agreement?
            </label>
            {errors.agreement && <span className="error">{errors.agreement}</span>}
            <button type="button" onClick={() => setShowAgreementPopup(true)}>View Agreement</button>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
      {showAgreementPopup && (
        <div className="agreement-popup">
          <div className="agreement-popup-content">
            <h3>Agreement Policy</h3>
            <p>User Agreement for [Your Company Name]

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
            <button onClick={() => setShowAgreementPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;








































