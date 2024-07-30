import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/UserProfile.css';
import UserProfileHobbies from '../Utils/UserProfileHobbies';
import UserProfileContext from '../Utils/UserProfileContext';

const UserProfile = () => {
  const { profilePicture, setProfilePicture, personalInfo, setPersonalInfo } = useContext(UserProfileContext);
  const [key, setKey] = useState('personal');
  const [cvFile, setCvFile] = useState(null);
  const [personalLetterFile, setPersonalLetterFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      await axios.post('/api/user/profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProfilePicture(URL.createObjectURL(file));
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert('Failed to save profile picture');
    }
  };

  const handleFileChange = async (e, setFile) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append(e.target.id, file);

    try {
      const response = await axios.post(`/api/user/${e.target.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFile(URL.createObjectURL(file));
    } catch (error) {
      console.error(`Error uploading ${e.target.id}:`, error);
      alert(`Failed to save ${e.target.id}`);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setPersonalInfo((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      hobbies: {
        ...prevInfo.hobbies,
        [name]: checked,
      },
    }));
  };

  const handleNext = (e, nextKey) => {
    e.preventDefault();
    setKey(nextKey);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/user/data', personalInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data');
    }
  };

  return (
    <Container fluid className="user-profile">
      <Row className="mt-3">
        <Col xs={12} md={3}>
          <Card className="p-3 mb-4 small-card">
            <Card.Body className="d-flex flex-column align-items-center">
              <Form onSubmit={handleSubmit}>
                <div className="image-preview card-img-top mb-3 d-flex justify-content-center align-items-center">
                  {profilePicture ? (
                    <img src={profilePicture} alt="Profile" className="img-fluid" />
                  ) : (
                    <p className="bold-text">Profile Picture</p>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <div className="button-group mt-3 d-flex justify-content-center">
                  <Button variant="primary" onClick={() => fileInputRef.current.click()} className="btn-sm">
                    Add Image
                  </Button>
                  {/* <Button variant="primary" type="submit" className="btn-sm ms-2">
                    Save
                  </Button> */}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-center">
          <Card className="p-3 mb-4 about-me-card">
            <Card.Body>
              <Card.Title className="text-center bold-text">About Me</Card.Title>
              <Tabs activeKey={key} onSelect={(k) => setKey(k)} id="about-me-tabs">
                <Tab eventKey="personal" title="Contact Info">
                  <Form className="mt-3" onSubmit={(e) => handleNext(e, 'professional')}>
                    <Form.Group controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your first name"
                        value={personalInfo.firstName}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="lastName" className="mt-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your last name"
                        value={personalInfo.lastName}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="phone" className="mt-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your phone number"
                        value={personalInfo.phone}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="city" className="mt-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your city"
                        value={personalInfo.city}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                      <Button variant="primary" type="submit" className="mt-3 next-button">
                        Next
                      </Button>
                    </div>
                  </Form>
                </Tab>
                <Tab eventKey="professional" title="Professional Information">
                  <Form className="mt-3" onSubmit={(e) => handleNext(e, 'social')}>
                    <Form.Group controlId="employer">
                      <Form.Label>Current Employer</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your current employer"
                        value={personalInfo.employer}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="occupation" className="mt-3">
                      <Form.Label>Occupation</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your occupation"
                        value={personalInfo.occupation}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                      <Button variant="primary" type="submit" className="mt-3 next-button">
                        Next
                      </Button>
                    </div>
                  </Form>
                </Tab>
                <Tab eventKey="social" title="This is Me">
                  <Form className="mt-3" onSubmit={(e) => handleNext(e, 'upload')}>
                    <Form.Group controlId="bio">
                      <Form.Label>About Me</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Tell us about yourself"
                        value={personalInfo.bio}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <UserProfileHobbies hobbies={personalInfo.hobbies} handleCheckboxChange={handleCheckboxChange} />
                    <div className="d-flex justify-content-center">
                      <Button variant="primary" type="submit" className="mt-3 next-button">
                        Next
                      </Button>
                    </div>
                  </Form>
                </Tab>
                <Tab eventKey="upload" title="Upload">
                  <Form className="mt-3" onSubmit={handleSubmit}>
                    <Form.Group controlId="cv">
                      <Form.Label>Upload CV</Form.Label>
                      <Form.Control type="file" onChange={(e) => handleFileChange(e, setCvFile)} />
                    </Form.Group>
                    <Form.Group controlId="personalLetter" className="mt-3">
                      <Form.Label>Upload Personal Letter</Form.Label>
                      <Form.Control type="file" onChange={(e) => handleFileChange(e, setPersonalLetterFile)} />
                    </Form.Group>
                    {/* <div className="d-flex justify-content-center">
                      <Button variant="primary" type="submit" className="mt-3 save-button">
                        Save
                      </Button>
                    </div> */}
                    <div className="d-flex justify-content-center mt-3">
                      <Button variant="success" type="button" onClick={() => navigate('/aboutme')} className="continue-button">
                        Continue
                      </Button>
                    </div>
                  </Form>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;












