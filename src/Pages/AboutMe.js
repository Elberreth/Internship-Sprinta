import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/AboutMe.css';
import UserProfileContext from '../Utils/UserProfileContext';

const AboutMe = () => {
  const { profilePicture, personalInfo } = useContext(UserProfileContext);
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/userprofile');
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
                </Dropdown.Menu>
              </Dropdown>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-center">
          <Card className="p-3 mb-4 about-me-card">
            <Card.Body>
              <Card.Title className="text-center bold-text">About Me</Card.Title>
              <Card.Text className="left-aligned-text">
                <p><span className="bold-text">Name:</span> {personalInfo.firstName} {personalInfo.lastName}</p>
                <p><span className="bold-text">Phone:</span> {personalInfo.phone}</p>
                <p><span className="bold-text">City:</span> {personalInfo.city}</p>
                <p><span className="bold-text">Employer:</span> {personalInfo.employer}</p>
                <p><span className="bold-text">Occupation:</span> {personalInfo.occupation}</p>
                <p><span className="bold-text">About Me:</span> {personalInfo.bio}</p>
                <p><span className="bold-text">Hobbies:</span></p>
                <ul>
                  {Object.keys(personalInfo.hobbies).map((hobby) => (
                    personalInfo.hobbies[hobby] ? <li key={hobby}>{hobby}</li> : null
                  ))}
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={3} className="position-relative">
          <div className="fixed-right">
            <Card className="p-3 mb-4 chat-card">
              <Card.Body>
                <Card.Title className="text-center bold-text">Add Friends</Card.Title>
                <Form>
                  <Form.Group controlId="formFriendEmail">
                    <Form.Control type="email" placeholder="Enter friend's email" />
                  </Form.Group>
                  <div className="button-container move-down">
                    <Button variant="primary" type="submit" className="custom-add-button">
                      Add
                    </Button>
                  </div>
                </Form>
                <div className="mt-4 text-center bold-text">Online Friends</div>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutMe;















