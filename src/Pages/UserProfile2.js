import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faUser, faHome } from '@fortawesome/free-solid-svg-icons';
import '../CSS/UserProfile.css';
import NewForm from '../Utils/NewForm';
import UserProfileContext from '../Utils/UserProfileContext';

const UserProfile2 = () => {
  const { profilePicture, personalInfo } = useContext(UserProfileContext);
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const friendsResponse = await axios.get('/api/user/friends');
        setFriends(friendsResponse.data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchUserData();
  }, []);

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
        <div className="col-md-3 position-relative">
          <div className="card p-3 mb-4 small-card profile-card">
            <div className="card-body d-flex flex-column align-items-center">
              <div className="image-preview">
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" className="img-fluid" />
                ) : (
                  <p className="bold-text">Profile Picture</p>
                )}
              </div>
              <p className="bold-text text-center mt-3">{personalInfo.firstName} {personalInfo.lastName}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center">
          <div className="new-form-container">
            <NewForm />
          </div>
        </div>
        <div className="col-md-3 add-friends-col">
          <div className="friends-container card p-3 mb-4 chat-card">
            <h5 className="card-title text-center bold-text">Friends List</h5>
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



























































