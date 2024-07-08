import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../CSS/Register.css";
import "../CSS/FormControls.css";
import "../CSS/Popup.css";
import AgreementPopup from "./AgreementPopup";
import generateRandomCode from "../Utils/RandomCodeGenerator";
import organisationList from "../Utils/OrganisationList";
import {
  validateEmailFormat,
  validatePassword,
} from "../Utils/ValidationTools";
import axios from "axios";

const Register = ({ resetFormTrigger }) => {
  const [firstStepDone, setFirstStepDone] = useState(false);
  const [validationCode, setValidationCode] = useState("");
  const [validationCodeError, setValidationCodeError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const popupRef = useRef(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);

  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      organisation: "",
      employmentStatus: "",
      password: "",
      confirmPassword: "",
      acceptAgreement: false,
    },
  });

  useEffect(() => {
    reset({
      firstname: "",
      lastname: "",
      email: "",
      codeToValidate: "",
      password: "",
      confirmPassword: "",
      organisation: "",
      employmentStatus: "",
      acceptAgreement: false,
    });
    setValidationErrors({});
  }, [resetFormTrigger, accountCreated, reset]);

  // useEffect(() => {
  //   reset2({
  //     codeToValidate: "",
  //     password: "",
  //     confirmPassword: "",
  //     acceptAgreement: false,
  //   });
  //   setValidationCode("");
  //   setValidationCodeError("");
  //   setEmailSent(false);
  //   setAccountCreated(false);
  //   setValidationErrors({});
  // }, [resetFormTrigger, accountCreated, reset2]);

  const sendData = async (data) => {
    console.log(data);
  };

  const handleSubmitGetValidationCode = async (data) => {
    console.log(
      data
    ); /*TODO: Remove before going live, BUT KEEP NOW for testing purposes during development*/
    let errorMessage = "";

    if (
      !data.firstname ||
      !data.lastname ||
      !data.email ||
      !validateEmailFormat(data.email)
    ) {
      errorMessage +=
        "First Name, Last Name, and Email in valid format is required. ";
    }
    if (!data.employmentStatus) {
      errorMessage += "Employment status is required. ";
    }
    if (!data.organisation) {
      errorMessage += "Organisation is required. ";
    }

    setValidationCodeError(errorMessage);

    if (!errorMessage) {
      const generatedCode = generateRandomCode();
      setValidationCode(generatedCode);

      try {
        await sendEmail(data.email, generatedCode);
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
    /* Calls backend to send validation code to email */
    axios
      .post("http://localhost:8080/email", {
        to: [email],
        subject: "Jambiz Alumni - Email Verification Code",
        templateId: "RegistrationCode",
        vals: {
          code: code,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error in sending validation code!", error);
      });
  };

  const openPopup = (event) => {
    event.preventDefault();
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // const validatePassword = (password) => {
  //   const passwordRegex =
  //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,10}$/;
  //   return passwordRegex.test(password);
  // };

  const handleRegister = (data) => {
    const { codeToValidate, password, confirmPassword, acceptAgreement } = data;
    let errors = {};

    // Validate code format
    const validationCodePattern = /^\d{4}-\d{4}$/;

    if (
      !codeToValidate ||
      !validationCodePattern.test(codeToValidate) ||
      codeToValidate !== validationCode
    ) {
      errors.codeToValidate =
        "Please enter your recieved validation code in the format xxxx-xxxx.";
    }

    if (password) {
      if (!validatePassword(password)) {
        errors.password =
          "Password must have at least 1 small-case letter,1 Capital letter, 1 digit, 1 special character and the length should be between 6-10 characters.";
      }
    } else {
      errors.password = "Please enter a valid password.";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (!acceptAgreement) {
      errors.acceptAgreement = "You must accept the agreement.";
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      let employmentStatus =
        data.employmentStatus === "Currently Employed" ? true : false;
      axios
        .post("http://localhost:8080/register", {
          firstName: data.firstname,
          lastName: data.lastname,
          email: data.email,
          password: data.password,
          isEmployed: employmentStatus,
          organisation_name: data.organisation,
        })
        .then((response) => {
          console.log(response.data);
          setAccountCreated(true);
          alert("Your application have been sent to an admin for approval");
        })
        .catch((error) => {
          setAccountCreated(false);
          console.error("There was an error in registering user!", error);
        });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="register-page">
      {!firstStepDone && (
        <div className="register-form-container">
          <form className="register-form" onSubmit={handleSubmit(sendData)}>
            <h2>Register</h2>
            <h4>Step 1/2</h4>
            <div className="form-group">
              <select
                id="organisation"
                className="form-control"
                {...register("organisation", {
                  required: "Organisation is required",
                })}
              >
                <option value="">Select Organisation</option>
                {organisationList.map((organisation, index) => (
                  <option key={index} value={organisation}>
                    {organisation}
                  </option>
                ))}
              </select>
              {errors.organisation && (
                <div className="error">{errors.organisation.message}</div>
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
                {...register("firstname", {
                  required: "First Name is required",
                })}
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
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid Email.",
                  },
                })}
              />
              {errors.email && (
                <div className="error">{errors.email.message}</div>
              )}
            </div>
            <div className="move-up-1cm">
              <div className="form-group"></div>
              <div className="form-group">
                <div className="password-container">
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is reqired",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,10}$/,
                        message:
                          "Password must have at least 1 small-case letter,1 Capital letter, 1 digit, 1 special character and the length should be between 6-10 characters.",
                      },
                    })}
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
                  {...register("confirmPassword", {
                    required: "Confirmation of Password is required.",
                    validate: (match) => {
                      const password = getValues("password");
                      return match === password || "Passwords have to match.";
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <div className="error">{errors.confirmPassword.message}</div>
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

            <button
              type="button"
              onClick={handleSubmit(handleRegister)}
              className="btn-small"
            >
              Proceed
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
      )}
      {firstStepDone && (
        <div className="register-form-container">
          <div className="register-form" onSubmit={handleSubmit(sendData)}>
            <h2>Confirm Email Address</h2>
            {emailSent && (
              <div className="success validation-message">
                Validation code has been sent to your email.
              </div>
            )}
            <h4>Step 2/2</h4>

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
                  {...register("codeToValidate", {
                    required: "Validation Code is required.",
                    pattern: {
                      value: /^\d{4}-\d{4}$/,
                      message:
                        "Please enter Validation Code in format: xxxx-xxxx",
                    },
                    validate: (match) => {
                      const originalCode = getValues("codeToValidate");
                      return match === originalCode || "Wrong code entered.";
                    },
                  })}
                />
                {errors.codeToValidate && (
                  <div className="error">{errors.codeToValidate.message}</div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit(handleRegister)}
              className="btn-small"
            >
              Confirm
            </button>
            {accountCreated && (
              <div className="success">
                Your application has been sent to an Admin for approval.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
