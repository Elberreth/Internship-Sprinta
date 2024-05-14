import React, { useState } from 'react';
import '../CSS/Register.css'; // Importera CSS för register-sidan

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: ''
  });

  const [errors, setErrors] = useState({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'agreement') {
      setAcceptedTerms(checked);
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.username) formErrors.username = 'Username is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.password) formErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) formErrors.confirmPassword = 'Passwords do not match';
    if (!formData.company) formErrors.company = 'Company is required';
    if (!acceptedTerms) formErrors.agreement = 'You must accept the agreement policy';
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      // Perform registration logic here
      console.log('Form data:', formData);
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
                checked={acceptedTerms}
                onChange={handleChange}
              />
              {' '}
              I agree to the <span className="agreement-link">agreement policy</span>
            </label>
            {errors.agreement && <span className="error">{errors.agreement}</span>}
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;



















