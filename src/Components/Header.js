import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import '../CSS/Header.css'; 
import logo from '../Images/Jambiz4.png'; 

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    console.log('Initial isLoggedIn status:', loggedIn);
    return loggedIn;
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      console.log('Storage change detected, isLoggedIn status:', loggedIn);
      setIsLoggedIn(loggedIn);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    console.log('User logging out');
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
    setShowLogoutModal(false);
    navigate('/login');
  };

  const handleShowLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
  };

  useEffect(() => {
    console.log('Current isLoggedIn state:', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>
        <div className="links-container">
          {isLoggedIn ? (
            <>
              <span onClick={handleShowLogoutModal} className="link" style={{ cursor: 'pointer' }}>Logout</span>
              <Modal show={showLogoutModal} onHide={handleCloseLogoutModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to Logout?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseLogoutModal} className="btn-sm-popup">
                    No
                  </Button>
                  <Button variant="primary" onClick={handleLogout} className="btn-sm-popup">
                    Yes
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          ) : (
            <Link to="/login" className="link">Login</Link>
          )}
          <Link to="/register" className="link">Register</Link>
          <Link to="/about" className="link">About</Link>
          <a href="https://jambiz.se/" className="link" target="_blank" rel="noopener noreferrer">Home</a>
        </div>
      </header>
    </>
  );
};

export default Header;







































  








