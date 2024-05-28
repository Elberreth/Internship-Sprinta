import React, { useState } from 'react';

const NewlyRegisteredUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, email: 'user1@example.com', firstName: 'John', lastName: 'Doe', company: 'Company A' },
    { id: 2, email: 'user2@example.com', firstName: 'Jane', lastName: 'Smith', company: 'Company B' },
    { id: 3, email: 'user3@example.com', firstName: 'Bill', lastName: 'Jones', company: 'Company C' },
  ]);

  return (
    <div>
      <h3>Newly Registered Users</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.firstName} {user.lastName} ({user.email}) - {user.company}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewlyRegisteredUsers;
