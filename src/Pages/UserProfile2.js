import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faUser, faHome } from '@fortawesome/free-solid-svg-icons';
import '../CSS/UserProfile.css';
import NewForm from '../Utils/NewForm';

const mockFriends = [
  { id: 1, name: 'Friend 1', online: true },
  { id: 2, name: 'Friend 2', online: false },
  { id: 3, name: 'Friend 3', online: true },
];

const UserProfile2 = () => {
  const [userData, setUserData] = useState({ profilePicture: '' });
  const [friends, setFriends] = useState(mockFriends);
  const [image, setImage] = useState(null);
  const [showAddImageButton, setShowAddImageButton] = useState(true);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

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

  return (
    <div className="container-fluid user-profile">
      <div className="row header-icons justify-content-center">
        <div className="col-auto">
          <FontAwesomeIcon icon={faCog} size="2x" onClick={() => navigate('/userprofile')} className="icon clickable" />
        </div>
        <div className="col-auto">
          <FontAwesomeIcon icon={faUser} size="2x" onClick={() => navigate('/aboutme')} className="icon clickable" />
        </div>
        <div className="col-auto">
          <FontAwesomeIcon icon={faHome} size="2x" onClick={() => navigate('/userprofile2')} className="icon clickable" />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-3">
          <form className="profile-form card p-3 mb-4 small-card">
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
        <div className="col-md-3 d-flex flex-column align-items-end match-height">
          <div className="friends-container card p-3 mb-4 friends-list-form">
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
  );
};

export default UserProfile2;






















































