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
      if (data.uname === 'admin@example.com' && data.password === '1111') {
        localStorage.setItem('isLoggedIn', 'true');
        console.log('Admin logged in');
        navigate('/admin');
        window.dispatchEvent(new Event('storage')); // Trigger storage event to sync state
      } else if (data.uname === 'user1@example.com' && data.password === '2222') {
        localStorage.setItem('isLoggedIn', 'true');
        console.log('User1 logged in');
        navigate(`/user/${data.uname.split('@')[0]}`);
        window.dispatchEvent(new Event('storage')); // Trigger storage event to sync state
      } else if (data.uname === 'user2@example.com' && data.password === '2222') {
        localStorage.setItem('isLoggedIn', 'true');
        console.log('User2 logged in');
        navigate(`/user/${data.uname.split('@')[0]}`);
        window.dispatchEvent(new Event('storage')); // Trigger storage event to sync state
      } else {
        setError('Authentication failed');
      }
    } catch (error) {
      setError('An error occurred while logging in');
    } finally {
      setLoading(false);
    }
  };

  const { register, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      uname: "", password: ""
    }
  });

  return (
    <>
      <div className="register-page">
        <div className="register-form-container">
          <form className="register-form" onSubmit={handleSubmit(sendData)}>
            <h2>Login</h2>
            <div className="form-group">
              <label htmlFor="inputUserName">Username</label>
              <input
                type="text"
                className="form-control"
                id="inputUserName"
                placeholder="Enter your Email"
                {...register("uname", {
                  required: 'Username is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.uname && <div style={{ color: 'red', fontSize: '12px' }} className="error-message">{errors.uname.message}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="inputUserPassword">Password</label>
              <input
                type="password"
                className="form-control"
                id="inputUserPassword"
                placeholder="Enter your password"
                {...register("password", { required: 'Password is required' })}
              />
              {errors.password && <div style={{ color: 'red', fontSize: '12px' }} className="error-message">{errors.password.message}</div>}
            </div>
            {error && <div style={{ color: 'red', fontSize: '12px' }} className="error-message">{error}</div>}
            <button type="submit" className="btn-small" disabled={loading}>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;





































