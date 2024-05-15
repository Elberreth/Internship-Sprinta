import React, { useState } from 'react';
import '../CSS/Register.css'; // Importera CSS för register-sidan

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    agreement: false // Lägg till agreement i formdata och sätt det till false som standard
  });

  const [errors, setErrors] = useState({});
  const [showAgreementPopup, setShowAgreementPopup] = useState(false); // Skapa state för att visa avtalpopup

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
            <p>Här kommer innehållet i din agreement policy...</p>
            <button onClick={() => setShowAgreementPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;








































