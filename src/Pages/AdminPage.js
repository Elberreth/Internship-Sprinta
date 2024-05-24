import React from 'react';
import Registration from './Register'; 
import { useHistory } from 'react-router-dom';

const AdminPage = () => {
  const history = useHistory();

  const registrations = [
    { id: 1, email: 'user1@example.com' },
    { id: 2, email: 'user2@example.com' },
    // Add more registrations here
  ];

  return (
    <div>
      <h1>Admin Page</h1>
      <h2>New Registrations</h2>
      <ul>
        {registrations.map((registration) => (
          <li key={registration.id}>
            <a href="#" onClick={() => viewDetails(registration.id)}>
              {registration.email}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  function viewDetails(registrationId) {
    // Navigate to the details page for the given registration ID
    history.push(`/registration/${registrationId}`);
  }
};

export default AdminPage;