import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../CSS/Register.css";
import "../CSS/FormControls.css";
import "../CSS/Popup.css";
import AgreementPopup from "../Components/AgreementPopup";
import generateRandomCode from "../Utils/RandomCodeGenerator";
import organisationList from "../Utils/OrganisationList";
import axios from "axios";

const Register = ({ resetFormTrigger }) => {
  const [firstStepDone, setFirstStepDone] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [receivedValidationCode, setReceivedValidationCode] = useState("");
  const [wrongCodeMessage, setWrongCodeMessage] = useState("");
  const [triggerReset, setTriggerReset] = useState(false);
  const popupRef = useRef(null);
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);

  const navigate = useNavigate();

  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      codeToValidate: "",
      organisation: "",
      employmentStatus: null,
      password: "",
      confirmPassword: "",
      acceptAgreement: false,
    },
  });

  useEffect(() => {
    reset({
      firstName: "",
      lastName: "",
      email: "",
      codeToValidate: "",
      password: "",
      confirmPassword: "",
      organisation: "",
      employmentStatus: null,
      acceptAgreement: false,
    });
  }, [triggerReset, resetFormTrigger, reset]);

  const sendData = async (data) => {
    console.log(data);
  };

  const handleProceedBtnClick = async (data) => {
    console.log(
      data
    ); /*TODO: Remove before going live, BUT KEEP NOW for testing purposes during development*/

    if (data.acceptAgreement) {
      const generatedCode = generateRandomCode();
      setShowSuccessMessage(false);
      setReceivedValidationCode(generatedCode);

      try {
        await sendEmail(data.email, generatedCode);
        setEmailSent(true);
        setFirstStepDone(true);
      } catch (error) {
        console.error("Error sending email:", error);
        setReceivedValidationCode("");
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

  const handleRegister = async (data) => {
    if (receivedValidationCode === data.codeToValidate) {
      axios
        .post("http://localhost:8080/auth/register", {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          isEmployed: data.employmentStatus,
          organisation_name: data.organisation,
        })
        .then((response) => {
          console.log(response.data);
          setWrongCodeMessage("");
          setShowSuccessMessage(true);
          alert("Your application have been sent to an admin for approval");
          setTriggerReset(!triggerReset);
          setReceivedValidationCode("");
          setAccountCreated(true);
        })
        .catch((error) => {
          console.error("There was an error in registering user!", error);
        });
    } else {
      setWrongCodeMessage(
        "Wrong code entered. Please check your email inbox for the valid code."
      );
    }
  };

  const handleToLogin = () => {
    setFirstStepDone(false);
    setAccountCreated(false);
    navigate("/login");
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
                    value={true}
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
                    value={false}
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
                {...register("firstName", {
                  required: "First Name is required",
                })}
              />
              {errors.firstName && (
                <div className="error">{errors.firstName.message}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="inputLastName"
                placeholder="Last Name"
                {...register("lastName", { required: "Last Name is required" })}
              />
              {errors.lastName && (
                <div className="error">{errors.lastName.message}</div>
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
                {errors.password && (
                  <div className="error">{errors.password.message}</div>
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
                  {...register("acceptAgreement", {
                    required: "You have to accept the Agreement to proceed.",
                  })}
                />
                <label htmlFor="acceptAgreement">
                  Do you accept the Agreement?{" "}
                  <span onClick={openPopup} className="agreement-link">
                    (View Agreement)
                  </span>
                </label>
              </div>
              {errors.acceptAgreement && (
                <div className="error agreement-error">
                  {errors.acceptAgreement.message}
                </div>
              )}
            </div>
            <div className="btn-div">
              <button
                type="button"
                onClick={handleSubmit(handleProceedBtnClick)}
                className="btn-proceed"
              >
                Proceed
              </button>
            </div>
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
      {firstStepDone && !accountCreated && (
        <div className="register-form-container">
          <div className="register-form" onSubmit={handleSubmit(sendData)}>
            <h2>Confirm Email Address</h2>
            {emailSent && (
              <div className="success validation-message">
                Validation code has been sent to your email.
              </div>
            )}
            <h4>Step 2/2</h4>
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
                  })}
                />
                {errors.codeToValidate && (
                  <div className="error">{errors.codeToValidate.message}</div>
                )}
                {wrongCodeMessage && (
                  <div className="error">{wrongCodeMessage}</div>
                )}
              </div>
            </div>
            <div className="btn-div">
              <button
                type="button"
                onClick={handleSubmit(handleRegister)}
                className="btn-confirm-email"
              >
                Confirm
              </button>
            </div>
            {showSuccessMessage && (
              <div className="success">
                Your application has been sent to an Admin for approval.
              </div>
            )}
          </div>
        </div>
      )}

      {accountCreated && (
        <div className="register-form-container">
          <div className="register-form" onSubmit={handleSubmit(sendData)}>
            <h2>Thank You!</h2>
            <div className="move-up-1cm">
              <div className="success">
                You have successfully sent an apply for registering an Alumni
                Portal account!
              </div>
              <div className="success">
                The request gets handled shortly and then you will get an email
                notification.
              </div>
            </div>
            <div className="btn-div">
              <Link to="/login">
                <button
                  type="button"
                  onClick={handleToLogin}
                  className="btn-to-login"
                >
                  To Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
