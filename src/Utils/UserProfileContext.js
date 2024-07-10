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
    hobbies: {
      reading: false,
      traveling: false,
      cooking: false,
      sports: false,
      music: false,
      fishing: false,
      skiing: false,
      climbing: false,
      gaming: false,
      it: false,
      movies: false,
      writing: false,
      gardening: false,
      running: false,
      meditate: false,
      decoration: false,
      charity: false,
      nature: false,
      animals: false,
      other: false,
    },
    cv: null,
    personalLetter: null,
  });

  return (
    <UserProfileContext.Provider value={{ profilePicture, setProfilePicture, personalInfo, setPersonalInfo }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileContext;


