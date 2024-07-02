import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../CSS/UserProfile2.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewForm from '../Utils/NewForm';

const mockFriends = [
  { id: 1, name: 'Friend 1', online: true },
  { id: 2, name: 'Friend 2', online: false },
  { id: 3, name: 'Friend 3', online: true },
];

const UserProfile2 = () => {
  const [userData, setUserData] = useState({
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
        const response = await axios.get('/api/user/profile-picture');
        if (response.data.profilePicture) {
          setImage(response.data.profilePicture);
          setShowAddImageButton(false);
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profilePicture', file);

    axios.post('/api/user/profile-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      setImage(URL.createObjectURL(file));
      setShowAddImageButton(false);
    })
    .catch(error => {
      console.error('Error uploading profile picture:', error);
    });
  };

  const handleRemoveImage = () => {
    const confirmed = window.confirm("Are you sure you want to remove the image?");
    if (confirmed) {
      axios.delete('/api/user/profile-picture')
      .then(response => {
        setImage(null);
        setShowAddImageButton(true);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      })
      .catch(error => {
        console.error('Error removing profile picture:', error);
      });
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
            <div className="image-preview card-img-top">
              {image ? (
                <img src={image} alt="Profile" />
              ) : (
                <p>Profile Picture</p>
              )}
            </div>
            <input
              type="file"
              onChange={handleImageChange}
              className="image-input"
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <div className="button-group mt-3 d-flex justify-content-center">
              {!showAddImageButton && (
                <button
                  type="button"
                  className="btn btn-danger btn-remove btn-sm"
                  onClick={handleRemoveImage}
                >
                  Remove Image
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <div className="new-form-container">
            <NewForm />
          </div>
        </div>
        <div className="col-md-3 d-flex flex-column align-items-center">
          <div className="friends-container card p-3 mb-4" style={{ width: '100%' }}>
            <h5 className="card-title text-center">Friends List</h5>
            <form onSubmit={handleAddFriend}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={newFriend}
                  onChange={(e) => setNewFriend(e.target.value)}
                  placeholder="Enter friend's name"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-sm w-100">Add Friend</button>
            </form>
            <h5 className="card-title text-center mt-4">Friends</h5>
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
  );
};

export default UserProfile2;













































