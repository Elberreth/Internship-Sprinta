import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../CSS/UserProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewForm from '../Utils/NewForm'; 


const mockFriends = [
  { id: 1, name: 'Friend 1', online: true },
  { id: 2, name: 'Friend 2', online: false },
  { id: 3, name: 'Friend 3', online: true },
];

const UserProfile = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    contactInfo: '',
    facebook: '',
    linkedin: '',
    cv: '',
    personalLetter: '',
    profilePicture: ''
  });

  const [friends, setFriends] = useState(mockFriends); 
  const [newFriend, setNewFriend] = useState(''); 
  const [image, setImage] = useState(null);
  const [showAddImageButton, setShowAddImageButton] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/{userId}');
        setUserData(response.data);
        if (response.data.profilePicture) {
          setImage(response.data.profilePicture);
          setShowAddImageButton(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    setUserData((prevData) => ({
      ...prevData,
      profilePicture: file
    }));
    setShowAddImageButton(false);
  };

  const handleRemoveImage = () => {
    const confirmed = window.confirm("Are you sure you want to remove the image?");
    if (confirmed) {
      setImage(null);
      setUserData((prevData) => ({
        ...prevData,
        profilePicture: ''
      }));
      setShowAddImageButton(true);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; 
      }
    }
  };

  const handleFileChange = (e) => {
    const { id } = e.target;
    const file = e.target.files[0];
    setUserData((prevData) => ({
      ...prevData,
      [id]: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in userData) {
      formData.append(key, userData[key]);
    }
    try {
      await axios.post('/api/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('User data saved successfully');
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleAddFriend = (e) => {
    e.preventDefault();
    if (newFriend.trim()) {
      setFriends([...friends, { id: friends.length + 1, name: newFriend, online: false }]);
      setNewFriend('');
    }
  };

  return (
    <div className="container-fluid user-profile">
      <header className="header"></header>
      <div className="row mt-3">
        <div className="col-md-3">
          <form className="profile-form card p-3 mb-4">
            <h2 className="card-title text-center">Profile Picture</h2>
            <div className="image-preview card-img-top">
              {image ? (
                <img src={image} alt="Profile" />
              ) : (
                <p>No image selected</p>
              )}
            </div>
            <input
              type="file"
              onChange={handleImageChange}
              className="image-input"
              ref={fileInputRef} 
              style={{ display: 'none' }} // Hide the file input
            />
            <div className="button-group mt-3">
              {showAddImageButton && (
                <button
                  type="button"
                  className="btn btn-primary btn-add"
                  onClick={() => fileInputRef.current.click()}
                >
                  Add Image
                </button>
              )}
              {!showAddImageButton && (
                <button
                  type="button"
                  className="btn btn-danger btn-remove"
                  onClick={handleRemoveImage}
                >
                  Remove Image
                </button>
              )}
            </div>
          </form>
          <form className="additional-form card p-3" onSubmit={handleSubmit}>
            <h2 className="card-title text-center">About Me</h2>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
                placeholder="Enter first name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contactInfo" className="form-label">Contact Info</label>
              <input
                type="text"
                className="form-control"
                id="contactInfo"
                value={userData.contactInfo}
                onChange={handleInputChange}
                placeholder="Enter contact info"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="facebook" className="form-label">Facebook</label>
              <input
                type="text"
                className="form-control"
                id="facebook"
                value={userData.facebook}
                onChange={handleInputChange}
                placeholder="Enter Facebook profile"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="linkedin" className="form-label">LinkedIn</label>
              <input
                type="text"
                className="form-control"
                id="linkedin"
                value={userData.linkedin}
                onChange={handleInputChange}
                placeholder="Enter LinkedIn profile"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cv" className="form-label">Upload CV</label>
              {userData.cv && (
                <div>
                  <a href={userData.cv} target="_blank" rel="noopener noreferrer">View CV</a>
                </div>
              )}
              <input
                type="file"
                className="form-control"
                id="cv"
                onChange={handleFileChange}
                data-browse="Browse"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="personalLetter" className="form-label">Upload Personal Letter</label>
              {userData.personalLetter && (
                <div>
                  <a href={userData.personalLetter} target="_blank" rel="noopener noreferrer">View Personal Letter</a>
                </div>
              )}
              <input
                type="file"
                className="form-control"
                id="personalLetter"
                onChange={handleFileChange}
                data-browse="Browse"
              />
            </div>
            <button type="submit" className="btn btn-primary submit-button mt-3">Submit</button>
          </form>
        </div>
        <div className="col-md-6 d-flex justify-content-center">
          <NewForm />
        </div>
        <div className="col-md-3 d-flex flex-column align-items-end">
          <div style={{ width: '50%' }}>
            <form className="friend-form card p-3 mb-4" onSubmit={handleAddFriend} style={{ width: '100%' }}>
              <h5 className="card-title text-center">Friends</h5>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={newFriend}
                  onChange={(e) => setNewFriend(e.target.value)}
                  placeholder="Enter friend's name"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-sm">Add Friend</button>
            </form>
            <div className="friends-list card p-3" style={{ width: '100%' }}>
              <h5 className="card-title text-center">Friends List</h5>
              <ul className="list-group">
                {friends.map(friend => (
                  <li key={friend.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {friend.name}
                    <span className={`badge ${friend.online ? 'bg-success' : 'bg-secondary'}`}>
                      {friend.online ? 'Online' : 'Offline'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;









































