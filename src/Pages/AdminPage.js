import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/AdminPage.css';
import NewlyRegisteredUsers from './NewlyRegisteredUsers';

const AdminPage = () => {
  const [selectedMenu, setSelectedMenu] = useState('New Users');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMenuChange = (menu) => {
    setSelectedMenu(menu);
    setShowDropdown(false);
  };

  const menuOptions = ['New Users', 'All Users', 'Companies', 'Roles'];

  return (
    <div className="admin-page">
      <div className="menu-column">
        <div className="menu-header">
          <h3 className="text-center">BackOffice</h3>
        </div>
        <div className="menu-button text-center">
          <div className="dropdown">
            <button
              className="btn btn-primary wider-button"
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Menu
            </button>
            {showDropdown && (
              <ul className="dropdown-menu show">
                {menuOptions
                  .filter((option) => option !== selectedMenu)
                  .map((option) => (
                    <li key={option} onClick={() => handleMenuChange(option)}>
                      <span className="dropdown-item">{option}</span>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="content-area">
        {selectedMenu === 'New Users' ? (
          <>
            <h3 className="content-title">Newly Registered Users</h3>
            <NewlyRegisteredUsers />
          </>
        ) : (
          <h1 className="centered-title">{selectedMenu}</h1>
        )}
      </div>
    </div>
  );
};

export default AdminPage;




































  







