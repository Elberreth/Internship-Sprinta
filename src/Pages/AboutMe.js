import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/AboutMe.css';
import UserProfileContext from '../Utils/UserProfileContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';

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

  const handleEditProfile = () => {
    navigate('/userprofile');
  };

  const handleViewFeed = () => {
    navigate('/userprofile2'); // Länkar till UserProfile2
  };

  const handleAddFriend = (e) => {
    e.preventDefault();
    if (friendEmail) {
      setFriends([...friends, { email: friendEmail, online: Math.random() < 0.5 }]); // Random online status for demo
      setFriendEmail('');
    }
  };

  const handleFriendEmailChange = (e) => {
    setFriendEmail(e.target.value);
  };

  return (
    <Container fluid className="about-me">
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
              <Dropdown className="dropdown-container">
                <Dropdown.Toggle variant="link" className="text-decoration-none p-0">
                  &#8942;
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleEditProfile}>Edit profile</Dropdown.Item>
                  <Dropdown.Item onClick={handleViewFeed}>View your feed</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Card.Body>
          </Card>
          <Card className="p-3 mb-4 job-openings-card">
            <Card.Body>
              <Card.Title className="text-center bold-text">Job Openings</Card.Title>
              <Card.Text className="text-center">This section will be used later.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-center">
          <Card className="p-3 mb-4 about-me-card">
            <Card.Body>
              <Card.Title className="text-center bold-text">About Me</Card.Title>
              <Card.Text className="left-aligned-text small-text">
                <p><span className="bold-text">Name:</span> {personalInfo.firstName} {personalInfo.lastName}</p>
                <p><span className="bold-text">Phone:</span> {personalInfo.phone}</p>
                <p><span className="bold-text">City:</span> {personalInfo.city}</p>
                <p><span className="bold-text">Employer:</span> {personalInfo.employer}</p>
                <p><span className="bold-text">Occupation:</span> {personalInfo.occupation}</p>
                <p><span className="bold-text">About Me:</span> {personalInfo.bio}</p>
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
        <Col xs={12} md={3} className="position-relative">
          <div className="fixed-right">
            <Card className="p-3 mb-4 chat-card">
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
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutMe;


























