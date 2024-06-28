import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import '../CSS/Register.css';
import '../CSS/FormControls.css';
import '../CSS/Popup.css';
import AgreementPopup from './AgreementPopup';
import generateRandomCode from '../Utils/RandomCodeGenerator';
import employers from '../Utils/OrganisationList';

const Register = ({ resetFormTrigger }) => {
  const [validationCode, setValidationCode] = useState(""); // Lägg till detta tillstånd för att lagra valideringskoden
  const [validationCodeError, setValidationCodeError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const popupRef = useRef(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      validateEmail: "",
      password: "",
      confirmPassword: "",
      company: "",
      employmentStatus: "",
      acceptAgreement: false,
    },
  });

  useEffect(() => {
    reset({
      firstname: "",
      lastname: "",
      email: "",
      validateEmail: "",
      password: "",
      confirmPassword: "",
      company: "",
      employmentStatus: "",
      acceptAgreement: false,
    });
    setValidationCode("");
    setValidationCodeError("");
    setEmailSent(false);
    setAccountCreated(false);
    setValidationErrors({});
  }, [resetFormTrigger, reset]);

  const sendData = async (data) => {
    console.log(data);
  };

  const handleSubmitGetValidationCode = async (data) => {
    console.log(data);
    let errorMessage = "";

    if (!data.firstname || !data.lastname || !data.email) {
      errorMessage += "First Name, Last Name, and Email are required. ";
    }
    if (!data.employmentStatus) {
      errorMessage += "Employment status is required. ";
    }
    if (!data.company) {
      errorMessage += "Company is required. ";
    }

    setValidationCodeError(errorMessage);

    if (!errorMessage) {
      const validationCode = generateRandomCode();
      setValidationCode(validationCode); // Sätt valideringskoden i tillståndet

      try {
        await sendEmail(data.email, validationCode);
        setEmailSent(true);
      } catch (error) {
        console.error("Error sending email:", error);
        setEmailSent(false);
      }
    } else {
      setEmailSent(false);
    }
  };

  const sendEmail = async (email, code) => {
    console.log(`Sending code ${code} to ${email}`);
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        const success = Math.random() > 0.1;
        success ? resolve() : reject(new Error("Failed to send email"));
      }, 1000)
    );
  };

  const openPopup = (event) => {
    event.preventDefault(); // Förhindrar att kryssrutan påverkas
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,10}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = handleSubmit((data) => {
    const { validateEmail, password, confirmPassword, acceptAgreement } = data;
    let errors = {};

    // Validate email format and code
    const validationCodePattern = /^\d{4}-\d{4}$/;
    if (!validateEmail || !validationCodePattern.test(validateEmail) || validateEmail !== validationCode) {
      errors.validateEmail = "Please fill in the Validate Email field with the correct code in the format xxxx-xxxx.";
    }

    if (password) {
      if (password.length < 6 || password.length > 10 || !validatePassword(password)) {
        errors.password = "Password must have at least 1 small-case letter, 1 Capital letter, 1 digit, 1 special character and the length should be between 6-10 characters.";
      }
    } else {
      errors.password = "Please fill in the Password field.";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (!acceptAgreement) {
      errors.acceptAgreement = "You must accept the agreement.";
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      setAccountCreated(true);
      alert('Your application have been sent to an admin for approval');
    }
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="register-page">
      <div className="register-form-container">
        <form className="register-form" onSubmit={handleSubmit(sendData)}>
          <h2>Register</h2>
          <div className="form-group">
            <select
              id="company"
              className="form-control"
              {...register("company", { required: "Company is required" })}
            >
              <option value="">Select Organisation</option>
              {employers.map((employer, index) => (
                <option key={index} value={employer}>
                  {employer}
                </option>
              ))}
            </select>
            {errors.company && (
              <div className="error">{errors.company.message}</div>
            )}
          </div>
          <div className="form-group radio-group">
            <div className="radio-buttons">
              <label>
                <input
                  type="radio"
                  name="employmentStatus"
                  value="Currently Employed"
                  {...register("employmentStatus", {
                    required: "Employment status is required",
                  })}
                />
                Currently Employed
              </label>
              <label>
                <input
                  type="radio"
                  name="employmentStatus"
                  value="Previously Employed"
                  {...register("employmentStatus", {
                    required: "Employment status is required",
                  })}
                />
                Previously Employed
              </label>
            </div>
            {errors.employmentStatus && (
              <div className="error">{errors.employmentStatus.message}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="inputFirstName"
              placeholder="First Name"
              {...register("firstname", { required: "First Name is required" })}
            />
            {errors.firstname && (
              <div className="error">{errors.firstname.message}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="inputLastName"
              placeholder="Last Name"
              {...register("lastname", { required: "Last Name is required" })}
            />
            {errors.lastname && (
              <div className="error">{errors.lastname.message}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <div className="error">{errors.email.message}</div>}
          </div>
          <button
            type="button"
            onClick={handleSubmit(handleSubmitGetValidationCode)}
            className="btn-wide-purple"
          >
            Get Validation Code
          </button>
          {emailSent && (
            <div className="success validation-message">
              Validation code has been sent to your email.
            </div>
          )}
          <div className="move-up-1cm">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="inputValidateEmail"
                placeholder="Type in your code (xxxx-xxxx)"
                {...register("validateEmail")}
              />
              {validationErrors.validateEmail && (
                <div className="error">{validationErrors.validateEmail}</div>
              )}
            </div>
            <div className="form-group">
              <div className="password-container">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  {...register("password")}
                />
                <span
                  className="password-tooltip"
                  onMouseEnter={() => setShowPasswordRequirements(true)}
                  onMouseLeave={() => setShowPasswordRequirements(false)}
                >
                  ?
                </span>
                {showPasswordRequirements && (
                  <div className="password-requirements-tooltip">
                    Password must have at least 1 small-case letter, 1 capital
                    letter, 1 digit, 1 special character, and be between 6-10
                    characters long.
                  </div>
                )}
              </div>
              {validationErrors.password && (
                <div className="error">{validationErrors.password}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="inputConfirmPassword"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              {validationErrors.confirmPassword && (
                <div className="error">{validationErrors.confirmPassword}</div>
              )}
            </div>
          </div>

          <div className="checkbox-container">
            <div className="agreement-container">
              <input
                type="checkbox"
                id="acceptAgreement"
                name="acceptAgreement"
                {...register("acceptAgreement")}
              />
              <label htmlFor="acceptAgreement">
                Do you accept the Agreement?{" "}
                <span onClick={openPopup} className="agreement-link">
                  (View Agreement)
                </span>
              </label>
            </div>
            {validationErrors.acceptAgreement && (
              <div className="error agreement-error">
                {validationErrors.acceptAgreement}
              </div>
            )}
          </div>

          <button type="button" onClick={handleRegister} className="btn-small">
            Register
          </button>
          {validationCodeError && (
            <div className="error">{validationCodeError}</div>
          )}
          {accountCreated && (
            <div className="success">
              Your application has been sent to an Admin for approval.
            </div>
          )}
          {showPopup && (
            <div className="agreement-popup" ref={popupRef}>
              <div className="agreement-popup-content">
                <h3 className="main-title">
                  User Agreement for Jambiz Alumni Portal
                </h3>
                <AgreementPopup onClose={closePopup} />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;





