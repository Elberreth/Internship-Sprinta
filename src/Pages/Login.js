// Login.js
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import '../CSS/Register.css';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendData = async (data) => {
    setLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // Check if the user is an admin
        const responseAdmin = await fetch('/api/is-admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (responseAdmin.ok) {
          // Redirect to admin page upon successful admin login
          navigate('/admin');
        } else {
          // Redirect to user profile page upon successful user login
          navigate('/user-profile');
        }
      } else {
        setError('Authentication failed');
      }
    } catch (error) {
      setError('An error occurred while logging in');
    } finally {
      setLoading(false);
    }
  }

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      email: "", password: ""
    }
  });

  return (
    <div className="register-page">
      <div className="register-form-container">
       <form className="register-form" onSubmit={handleSubmit(sendData)}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="inputEmail">Email</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="Email"
              {...register("email", { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } })}
            />
            {errors.email && <div style={{ color: 'red', fontSize: '12px' }} className="error-message">{errors.email.message}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Password"
              {...register("password", { required: 'Password is required' })}
            />
            {errors.password && <div style={{ color: 'red', fontSize: '12px' }} className="error-message">{errors.password.message}</div>}
          </div>
          {error && <div style={{ color: 'red', fontSize: '12px' }} className="error-message">{error}</div>}
          <button type="submit" className="btn-small" disabled={loading}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Login;













