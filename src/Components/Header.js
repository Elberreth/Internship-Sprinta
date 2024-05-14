// src/Components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Header.css'; 
import logo from '../Images/Jambiz4.png'; 


const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" /> 
        </Link>
      </div>
      <div className="links-container">
        <Link to="/login" className="link">Login</Link>
        <Link to="/register" className="link">Register</Link>
        <Link to="/about" className="link">About</Link>
        <a href="https://jambiz.se/" className="link" target="_blank" rel="noopener noreferrer">Home</a>
      </div>
    </header>
  );
};

export default Header;

















  








