import React, { useState } from 'react';

import '../CSS/AdminPage.css';

const AdminPage = () => {
  const [showUsers, setShowUsers] = useState(false);

  return (
    <div className="admin-page">
      <div className="menu-column">
        <div className="menu-header">
          <h4 className="bold-text">BackOffice</h4>
        </div>
        <div className="menu-button">
          <button type="button" onClick={() => setShowUsers(!showUsers)} className="btn btn-primary wider-button">New Users</button>
          <button type="button" className="btn btn-primary wider-button">All Users</button>
          <button type="button" className="btn btn-primary wider-button">Companies</button>
          <button type="button" className="btn btn-primary wider-button">Roles</button>
        </div>
      </div>
      <div className="content-area">
        <h1 className="centered-title">Hello Christian, Anita and Jackie ;)</h1>
      </div>
    </div>
  );
};
};

export default AdminPage;




























  







