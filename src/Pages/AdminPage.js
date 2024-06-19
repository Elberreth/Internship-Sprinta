import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/AdminPage.css';
import NewlyRegisteredUsers from './NewlyRegisteredUsers';
import AllUsers from './AllUsers';
import Organisations from './Companies'; 
import Roles from './Roles';

const AdminPage = () => {
  const [selectedMenu, setSelectedMenu] = useState('New Users');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMenuChange = (menu) => {
    setSelectedMenu(menu);
    setShowDropdown(false);
  };

  const menuOptions = ['New Users', 'All Users', 'Organisations', 'Access Management']; 

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
        {selectedMenu === 'New Users' && (
          <>
            <h3 className="content-title">Newly Registered Users</h3>
            <NewlyRegisteredUsers />
          </>
        )}
        {selectedMenu === 'All Users' && (
          <>
            <h3 className="content-title">All Users</h3>
            <AllUsers />
          </>
        )}
        {selectedMenu === 'Organisations' && ( 
          <>
            <h3 className="content-title">Organisations</h3> 
            <Organisations />
          </>
        )}
        {selectedMenu === 'Access Management' && (
          <>
            <h3 className="content-title">Access Management</h3>
            <Roles />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;











































  







