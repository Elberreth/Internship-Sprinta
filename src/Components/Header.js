import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Header.css'; 
import logo from '../Images/Jambiz3.png'; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" /> 
        <div className="links-container">
          <Link to="/login" className="link">Login</Link>
          <Link to="/register" className="link">Register</Link>
         
        </div>
      </div>
    </header>
  );
};

export default Header;












  








