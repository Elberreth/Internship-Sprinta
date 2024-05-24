import React, { useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState<any>({});

  const fetchUserProfile = async () => {
    // Placeholder for API call to fetch user profile data
    const response = await fetch('/api/user-profile');
    const data = await response.json();
    setUser(data);
  };

  return (
    <div>
      <h1>User Profile</h1>
      <button onClick={fetchUserProfile}>Fetch User Profile</button>
      <div>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
};

export default UserProfile;