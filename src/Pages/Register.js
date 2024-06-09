import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../CSS/Global.css';
import '../CSS/Register.css';
import '../CSS/FormControls.css';
import '../CSS/Buttons.css';
import '../CSS/Popup.css';
import AgreementPopup from './AgreementPopup';
import generateRandomCode from '../Utils/RandomCodeGenerator';

const Register = () => {
  const [validationCodeError, setValidationCodeError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const popupRef = useRef(null);
  const [registrationError, setRegistrationError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
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
      acceptAgreement: false
    }
  });

  const sendData = async (data) => {
    console.log(data);
  };

  const handleSubmitGetValidationCode = async () => {
    const data = getValues();
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
      setGeneratedCode(validationCode);

      try {
        await sendEmail(data.email, validationCode);
        setEmailSent(true);
        setValidationCodeError(""); // Clear error message when email is sent successfully
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
    return new Promise((resolve, reject) => setTimeout(() => {
      const success = Math.random() > 0.1;
      success ? resolve() : reject(new Error("Failed to send email"));
    }, 1000));
  };

  const openPopup = () => {
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

    // Validate email format
    const validationCodePattern = /^\d{4}-\d{4}$/;
    if (!validateEmail || !validationCodePattern.test(validateEmail)) {
      errors.validateEmail = "Please fill in the Validate Email field in the format xxxx-xxxx.";
    }

    if (password) {
      if (password.length < 6 || password.length > 10 || !validatePassword(password)) {
        errors.password = "Password must have at least 1 small-case letter,1 Capital letter, 1 digit, 1 special character and the length should be between 6-10 characters.";
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
      setRegistrationError("");
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
              {...register("company", { required: 'Company is required' })}
            >
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
            {errors.company && <div className="error">{errors.company.message}</div>}
          </div>
          <div className="form-group radio-group">
            <div className="radio-buttons">
              <label>
                <input
                  type="radio"
                  name="employmentStatus"
                  value="Currently Employed"
                  {...register("employmentStatus", { required: 'Employment status is required' })}
                />
                Currently Employed
              </label>
              <label>
                <input
                  type="radio"
                  name="employmentStatus"
                  value="Previously Employed"
                  {...register("employmentStatus", { required: 'Employment status is required' })}
                />
                Previously Employed
              </label>
            </div>
            {errors.employmentStatus && <div className="error">{errors.employmentStatus.message}</div>}
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="inputFirstName"
              placeholder="First Name"
              {...register("firstname", { required: 'First Name is required' })}
            />
            {errors.firstname && <div className="error">{errors.firstname.message}</div>}
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="inputLastName"
              placeholder="Last Name"
              {...register("lastname", { required: 'Last Name is required' })}
            />
            {errors.lastname && <div className="error">{errors.lastname.message}</div>}
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="Email"
              {...register("email", { required: 'Email is required' })}
            />
            {errors.email && <div className="error">{errors.email.message}</div>}
          </div>
          <button type="button" onClick={handleSubmitGetValidationCode} className="btn-wide-purple btn-move-up">Get Validation Code</button>
          <div className="validation-message">
            {emailSent && <div className="success">Validation code has been sent to your email.</div>}
            {validationCodeError && <div className="error">{validationCodeError}</div>}
          </div>
          <div className="move-up">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="inputValidateEmail"
                placeholder="Type in your code (xxxx-xxxx)"
                {...register("validateEmail")}
              />
              {validationErrors.validateEmail && <div className="error">{validationErrors.validateEmail}</div>}
            </div>

            {/* Password field */}
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Password"
                {...register("password")}
              />
              {validationErrors.password && <div className="error">{validationErrors.password}</div>}
            </div>

            {/* Confirm Password field */}
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="inputConfirmPassword"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              {validationErrors.confirmPassword && <div className="error">{validationErrors.confirmPassword}</div>}
            </div>

            <div className="checkbox-container">
              <input type="checkbox" id="acceptAgreement" name="acceptAgreement" {...register("acceptAgreement")} />
              <label htmlFor="acceptAgreement">Do you accept the Agreement? <a href="#" onClick={openPopup}>(View Agreement)</a></label>
              {validationErrors.acceptAgreement && <div className="error">{validationErrors.acceptAgreement}</div>}
            </div>
          </div>
          <button type="button" onClick={handleRegister} className="btn-small">Register</button>
          <div className="message-container">
            {registrationError && <div className="error">{registrationError}</div>}
            {accountCreated && <div className="success">Your application have been sent to an Admin for approval.</div>}
          </div>
          {showPopup && (
            <div className="agreement-popup" ref={popupRef}>
              <div className="agreement-popup-content">
                <span className="popup-btn" onClick={closePopup}>&times;</span>
                <h3>Agreement</h3>
                <AgreementPopup onClose={closePopup} />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;













































































































