import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faUser, faHome, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/AboutMe.css';
import UserProfileContext from '../Utils/UserProfileContext';

const capitalizeFirstLetter = (string) => {
  if (string.toLowerCase() === 'it') {
    return 'IT';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const AboutMe = () => {
  const { profilePicture, personalInfo } = useContext(UserProfileContext);
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [friendEmail, setFriendEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleEditProfile = () => {
    navigate('/userprofile');
  };

  const handleAboutMe = () => {
    navigate('/aboutme');
  };

  const handleHome = () => {
    navigate('/userprofile2');
  };

  const handleAddFriend = (e) => {
    e.preventDefault();
    if (friendEmail.trim()) {
      const friendExists = friends.some(friend => friend.email === friendEmail);
      if (!friendExists) {
        setFriends([...friends, { email: friendEmail, online: Math.random() < 0.5 }]);
        setFriendEmail('');
      } else {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
      }
    }
  };

  const handleFriendEmailChange = (e) => {
    setFriendEmail(e.target.value);
  };

  return (
    <Container fluid className="about-me">
      <Row className="header-icons justify-content-center">
        <Col xs="auto">
          <FontAwesomeIcon icon={faCog} size="2x" onClick={handleEditProfile} className="icon clickable" />
        </Col>
        <Col xs="auto">
          <FontAwesomeIcon icon={faUser} size="2x" onClick={handleAboutMe} className="icon clickable" />
        </Col>
        <Col xs="auto">
          <FontAwesomeIcon icon={faHome} size="2x" onClick={handleHome} className="icon clickable" />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12} md={3} className="position-relative">
          <Card className="p-3 mb-4 profile-card">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="image-preview">
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" className="img-fluid" />
                ) : (
                  <p className="bold-text">Profile Picture</p>
                )}
              </div>
              <p className="bold-text text-center mt-3">{personalInfo.firstName} {personalInfo.lastName}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-center">
          <Card className="p-3 mb-4 about-me-card">
            <Card.Body>
              <Card.Title className="text-center bold-text">About Me</Card.Title>
              <Card.Text className="left-aligned-text">
                <p><span className="bold-text">This is me:</span> {personalInfo.bio}</p>
                <p><span className="bold-text">Phone:</span> {personalInfo.phone}</p>
                <p><span className="bold-text">City:</span> {personalInfo.city}</p>
                <p><span className="bold-text">Employer:</span> {personalInfo.employer}</p>
                <p><span className="bold-text">Occupation:</span> {personalInfo.occupation}</p>
                <p><span className="bold-text">Hobbies:</span></p>
                <ul>
                  {Object.keys(personalInfo.hobbies).map((hobby) => (
                    personalInfo.hobbies[hobby] ? <li key={hobby}>{capitalizeFirstLetter(hobby)}</li> : null
                  ))}
                </ul>
                <div className="document-icons">
                  {personalInfo.cv && (
                    <a href={personalInfo.cv} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faFileAlt} size="2x" />
                      <span className="document-text">CV</span>
                    </a>
                  )}
                  {personalInfo.personalLetter && (
                    <a href={personalInfo.personalLetter} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faFileAlt} size="2x" />
                      <span className="document-text">Personal Letter</span>
                    </a>
                  )}
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={3} className="add-friends-col">
          <Card className={`p-3 mb-4 chat-card ${friends.length === 0 ? 'minimal-chat-card' : ''}`}>
            <Card.Body>
              <Card.Title className="text-center bold-text">Add Friends</Card.Title>
              <Form onSubmit={handleAddFriend}>
                <Form.Group controlId="formFriendEmail">
                  <Form.Control
                    type="email"
                    placeholder="Enter friend's email"
                    value={friendEmail}
                    onChange={handleFriendEmailChange}
                  />
                </Form.Group>
                <div className="button-container move-down">
                  <Button variant="primary" type="submit" className="custom-add-button">
                    Add
                  </Button>
                </div>
              </Form>
              {showAlert && (
                <Alert variant="danger" className="mt-2">
                  This email is already in the list.
                </Alert>
              )}
              <div className="mt-4 text-center bold-text">Online Friends</div>
              <ul className="online-friends-list">
                {friends.filter(friend => friend.online).map((friend, index) => (
                  <li key={index} className="online-friend-item">
                    <span className="online-dot"></span>
                    {friend.email}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutMe;














































