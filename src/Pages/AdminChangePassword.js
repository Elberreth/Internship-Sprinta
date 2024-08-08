import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import '../CSS/AdminChangePassword.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AdminChangePassword = () => {
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const { register, handleSubmit, getValues, formState: { errors } } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = async(data) => {


    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
    }
    else {

        const token = localStorage.getItem('token');
        const emailLogin = localStorage.getItem('email');
        const isAdmin = localStorage.getItem('isAdmin');
        const requestData = {
            email: emailLogin,
            password: data.password,
            repeatPassword: data.confirmPassword
        };
        try {
                await axios.put("http://localhost:8080/resetPassword",requestData, {
                                               headers: {
                                                   'Authorization': `Bearer ${token}`,
                                                   'Content-Type': 'application/json'
                                               }
                });
                setSuccessMessage("Your password has successfully been changed");

                 if(isAdmin === 'true') {
                        navigate('/admin');
                 } else {
                        navigate('/userprofile');
                }
            }
            catch (error) {
                     setError('Error while resetting password!');
            }

    }

  };

  return (
    <div className="register-page">
      <div className="register-form-container">
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Reset Password</h2>
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <div className="password-container">
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your new password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,10}$/,
                    message: "Password must have at least 1 small-case letter, 1 capital letter, 1 digit, 1 special character and be between 6-10 characters long."
                  }
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
                  Password must have at least 1 small-case letter, 1 capital letter, 1 digit, 1 special character, and be between 6-10 characters long.
                </div>
              )}
            </div>
            {errors.password && (
              <div className="error">{errors.password.message}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Confirm your new password"
              {...register("confirmPassword", {
                required: "Confirmation of password is required",
                validate: (value) => value === getValues("password") || "Passwords do not match"
              })}
            />
            {errors.confirmPassword && (
              <div className="error">{errors.confirmPassword.message}</div>
            )}
          </div>
          <div className="btn-div">
            <button type="submit" className="btn-small">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminChangePassword;






