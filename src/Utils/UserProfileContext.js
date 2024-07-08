import React, { createContext, useState } from 'react';

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    employer: '',
    occupation: '',
    bio: '',
    hobbies: [],
  });

  return (
    <UserProfileContext.Provider value={{ profilePicture, setProfilePicture, personalInfo, setPersonalInfo }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileContext;
