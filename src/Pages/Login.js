import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import '../CSS/Register.css';
import axios from "axios";




const Login = ({ setIsLoggedIn }) => {



  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendData = async (data) => {

    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('token', null);
    localStorage.setItem('email', null);
    localStorage.setItem('isAdmin', false);
    setIsLoggedIn(false);

    setLoading(true);
    try {

      //API CALL TO LOGIN
      let resetFlag = false;
      let tokenLogin = '';
      let isAdmin = false;

      try {
        const response = await axios.post("http://localhost:8080/auth/login", {
           email: data.uname,
           password: data.password
         });
         resetFlag = response.data.resetPassword;
         tokenLogin = response.data.token;
         isAdmin = response.data.isAdmin;
      }
      catch (error) {
         setError('Invalid username or password provided!');
      }


      if (tokenLogin === null || tokenLogin.trim() === '') {
             setError('Authentication failed');
      } else {
            localStorage.setItem('isLoggedIn', 'true');
                            localStorage.setItem('token', tokenLogin);
                            localStorage.setItem('email', data.uname);
                            localStorage.setItem('isAdmin', isAdmin);
                            setIsLoggedIn(true);

                            if (resetFlag) {
                                navigate('/admin-change-password');
                            }
                            else {
                                     if(isAdmin)  {
                                            navigate('/admin');
                                       }
                                       else {
                                           navigate('/userprofile')
                                     }
                            }
                            window.dispatchEvent(new Event('storage')); // Trigger storage event to sync state

      }
    } catch (error) {
      setError('Error while logging in. Please enter valid login credentials!');
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







































