import React, { useState, useRef } from 'react';
import { Form, Button, Card, Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/UserProfile.css';

const UserProfile = () => {
  const [image, setImage] = useState(null);
  const [showAddImageButton, setShowAddImageButton] = useState(true);
  const fileInputRef = useRef(null);
  const [cv, setCv] = useState(null);
  const [personalLetter, setPersonalLetter] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    setShowAddImageButton(false);
  };

  const handleRemoveImage = () => {
    const confirmed = window.confirm("Are you sure you want to remove the image?");
    if (confirmed) {
      setImage(null);
      setShowAddImageButton(true);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; 
      }
    }
  };

  const handleFileChange = (e) => {
    const { id } = e.target;
    const file = e.target.files[0];
    if (id === 'cv') {
      setCv(file);
    } else if (id === 'personalLetter') {
      setPersonalLetter(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Data saved successfully');
  };

  const handleContinue = (e) => {
    e.preventDefault();
    alert('Navigating to personal page...');
    // Implement the navigation logic here
  };

  return (
    <Container fluid className="user-profile">
      <Row className="mt-3">
        <Col xs={12} md={3}>
          <Card className="p-3 mb-4 small-card">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <div className="image-preview card-img-top mb-3">
                  {image ? (
                    <img src={image} alt="Profile" className="img-fluid" />
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
                <div className="button-group mt-3">
                  {showAddImageButton && (
                    <Button variant="primary" onClick={() => fileInputRef.current.click()}>
                      Add Image
                    </Button>
                  )}
                  {!showAddImageButton && (
                    <Button variant="danger" onClick={handleRemoveImage} size="sm">
                      Remove Image
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-center">
          <Card className="p-3 mb-4 about-me-card">
            <Card.Body>
              <Card.Title className="text-center bold-text">About Me</Card.Title>
              <Card.Text className="text-center bold-text">
                Please fill out this form to have the best experience with Jambiz Alumni Portal.
              </Card.Text>
              <Tabs defaultActiveKey="personal" id="about-me-tabs">
                <Tab eventKey="personal" title="Personal Information">
                  <Form className="mt-3" onSubmit={handleSubmit}>
                    <Form.Group controlId="formFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter your first name" />
                    </Form.Group>
                    <Form.Group controlId="formLastName" className="mt-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter your last name" />
                    </Form.Group>
                    <Form.Group controlId="formEmail" className="mt-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="Enter your email" />
                    </Form.Group>
                    <Form.Group controlId="formPhone" className="mt-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control type="text" placeholder="Enter your phone number" />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                      <Button variant="primary" type="submit" className="mt-3">
                        Submit
                      </Button>
                    </div>
                  </Form>
                </Tab>
                <Tab eventKey="professional" title="Professional Information">
                  <Form className="mt-3" onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmployer">
                      <Form.Label>Current Employer</Form.Label>
                      <Form.Control type="text" placeholder="Enter your current employer" />
                    </Form.Group>
                    <Form.Group controlId="formEducation" className="mt-3">
                      <Form.Label>Education</Form.Label>
                      <Form.Control type="text" placeholder="Enter your education" />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                      <Button variant="primary" type="submit" className="mt-3">
                        Submit
                      </Button>
                    </div>
                  </Form>
                </Tab>
                <Tab eventKey="social" title="Social Information">
                  <Form className="mt-3" onSubmit={handleSubmit}>
                    <Form.Group controlId="formBio">
                      <Form.Label>About Me</Form.Label>
                      <Form.Control as="textarea" rows={5} placeholder="Tell us about yourself" />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                      <Button variant="primary" type="submit" className="mt-3">
                        Submit
                      </Button>
                    </div>
                  </Form>
                </Tab>
                <Tab eventKey="upload" title="Upload">
                  <Form className="mt-3" onSubmit={handleSubmit}>
                    <Form.Group controlId="formCv">
                      <Form.Label>Upload CV</Form.Label>
                      <Form.Control type="file" id="cv" onChange={handleFileChange} />
                    </Form.Group>
                    <Form.Group controlId="formPersonalLetter" className="mt-3">
                      <Form.Label>Upload Personal Letter</Form.Label>
                      <Form.Control type="file" id="personalLetter" onChange={handleFileChange} />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                      <Button variant="primary" type="submit" className="mt-3">
                        Submit
                      </Button>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                      <Button variant="success" type="button" onClick={handleContinue} className="continue-button">
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



































