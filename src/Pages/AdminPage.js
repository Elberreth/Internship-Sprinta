import React, { useState } from 'react';
import '../CSS/AdminPage.css';

const AdminPage = () => {
  const [users, setUsers] = useState([
    { id: 1, email: 'user1@example.com', firstName: 'John', lastName: 'Doe', company: 'Company A' },
    { id: 2, email: 'user2@example.com', firstName: 'Jane', lastName: 'Smith', company: 'Company B' },
    { id: 3, email: 'user3@example.com', firstName: 'Bill', lastName: 'Jones', company: 'Company C' },
  ]);

  const [viewMore, setViewMore] = useState(null);

  const handleViewMore = (id) => {
    if (viewMore === id) {
      setViewMore(null);
    } else {
      setViewMore(id);
    }
  };

  return (
    <div className="admin-page">
      <h5 className="admin-title">Welcome to the Admin Page</h5>
      <div className="new-users">
        <h5>Newly Registered Users</h5>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <p>Email: {user.email}</p>
              {viewMore === user.id ? (
                <div>
                  <p>First Name: {user.firstName}</p>
                  <p>Last Name: {user.lastName}</p>
                  <p>Company: {user.company}</p>
                  <button onClick={() => handleViewMore(user.id)}>View less</button>
                </div>
              ) : (
                <button onClick={() => handleViewMore(user.id)}>View more</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminPage;






