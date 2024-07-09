import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Tabs,
  Tab,
} from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/UserProfile.css";
import UserProfileHobbies from "../Utils/UserProfileHobbies";

const UserProfile = () => {
  const [key, setKey] = useState("personal"); // For tab navigation
  const [image, setImage] = useState(null);
  const [showAddImageButton, setShowAddImageButton] = useState(true);
  const fileInputRef = useRef(null);
  const [cv, setCv] = useState(null);
  const [personalLetter, setPersonalLetter] = useState(null);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "", // Added city field
  });
  const [professionalInfo, setProfessionalInfo] = useState({
    employer: "",
    education: "",
  });
  const [bio, setBio] = useState("");
  const [hobbies, setHobbies] = useState({
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
  });
  const navigate = useNavigate();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const response = await axios.post("/api/user/profile-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImage(URL.createObjectURL(file));
      setShowAddImageButton(false);
      alert("Profile picture saved successfully");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to save profile picture");
    }
  };

  const handleRemoveImage = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to remove the image?"
    );
    if (confirmed) {
      try {
        await axios.delete("/api/user/profile-picture");
        setImage(null);
        setShowAddImageButton(true);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        alert("Profile picture removed successfully");
      } catch (error) {
        console.error("Error removing profile picture:", error);
        alert("Failed to remove profile picture");
      }
    }
  };

  const handleFileChange = (e) => {
    const { id } = e.target;
    const file = e.target.files[0];
    if (id === "cv") {
      setCv(file);
    } else if (id === "personalLetter") {
      setPersonalLetter(file);
    }
  };

  const handleInputChange = (e, setState) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setHobbies((prevHobbies) => ({
      ...prevHobbies,
      [name]: checked,
    }));
  };

  const handleNext = (e, nextKey) => {
    e.preventDefault();
    setKey(nextKey);
  };

  const handleSubmit = async (e, data, endpoint) => {
    e.preventDefault();
    try {
      await axios.post(endpoint, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Data saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data");
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (cv) formData.append("cv", cv);
    if (personalLetter) formData.append("personalLetter", personalLetter);
    try {
      await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Files uploaded successfully");
      // Now save all other data
      await handleSubmit(
        e,
        {
          ...personalInfo,
          ...professionalInfo,
          bio,
          hobbies,
        },
        "/api/user/data"
      );
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files");
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    navigate("/userprofile2");
  };

  return (
    <Container fluid className="user-profile">
      <Row className="mt-3">
        <Col xs={12} md={3}>
          <Card className="p-3 mb-4 small-card">
            <Card.Body className="d-flex flex-column align-items-center">
              <Form
                onSubmit={(e) =>
                  handleSubmit(
                    e,
                    { profilePicture: image },
                    "/api/profile-picture"
                  )
                }
              >
                <div className="image-preview card-img-top mb-3 d-flex justify-content-center align-items-center">
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
                  style={{ display: "none" }}
                />
                <div className="button-group mt-3 d-flex justify-content-center">
                  {showAddImageButton && (
                    <Button
                      variant="primary"
                      onClick={() => fileInputRef.current.click()}
                      className="btn-sm"
                    >
                      Add Image
                    </Button>
                  )}
                  {!showAddImageButton && (
                    <Button
                      variant="danger"
                      onClick={handleRemoveImage}
                      size="sm"
                    >
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
              <Card.Title className="text-center bold-text">
                About Me
              </Card.Title>
              <Card.Text className="text-center bold-text">
                Please fill out this form to have the best experience with
                Jambiz Alumni Portal.
              </Card.Text>
              <Tabs
                activeKey={key}
                onSelect={(k) => setKey(k)}
                id="about-me-tabs"
              >
                <Tab eventKey="personal" title="Contact Info">
                  <Form
                    className="mt-3"
                    onSubmit={(e) => handleNext(e, "professional")}
                  >
                    <Form.Group controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your first name"
                        value={personalInfo.firstName}
                        onChange={(e) => handleInputChange(e, setPersonalInfo)}
                      />
                    </Form.Group>
                    <Form.Group controlId="lastName" className="mt-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your last name"
                        value={personalInfo.lastName}
                        onChange={(e) => handleInputChange(e, setPersonalInfo)}
                      />
                    </Form.Group>
                    <Form.Group controlId="phone" className="mt-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your phone number"
                        value={personalInfo.phone}
                        onChange={(e) => handleInputChange(e, setPersonalInfo)}
                      />
                    </Form.Group>
                    <Form.Group controlId="city" className="mt-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your city"
                        value={personalInfo.city}
                        onChange={(e) => handleInputChange(e, setPersonalInfo)}
                      />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                      <Button
                        variant="primary"
                        type="submit"
                        className="mt-3 next-button"
                      >
                        Next
                      </Button>
                    </div>
                  </Form>
                </Tab>
                <Tab eventKey="professional" title="Professional Information">
                  <Form
                    className="mt-3"
                    onSubmit={(e) => handleNext(e, "social")}
                  >
                    <Form.Group controlId="employer">
                      <Form.Label>Current Employer</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your current employer"
                        value={professionalInfo.employer}
                        onChange={(e) =>
                          handleInputChange(e, setProfessionalInfo)
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="occupation" className="mt-3">
                      <Form.Label>Occupation</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your occupation"
                        value={professionalInfo.education}
                        onChange={(e) =>
                          handleInputChange(e, setProfessionalInfo)
                        }
                      />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                      <Button
                        variant="primary"
                        type="submit"
                        className="mt-3 next-button"
                      >
                        Next
                      </Button>
                    </div>
                  </Form>
                </Tab>
                <Tab eventKey="social" title="This is Me">
                  <Form
                    className="mt-3"
                    onSubmit={(e) => handleNext(e, "upload")}
                  >
                    <Form.Group controlId="bio">
                      <Form.Label>About Me</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Tell us about yourself"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                    </Form.Group>
                    <UserProfileHobbies
                      hobbies={hobbies}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                    <div className="d-flex justify-content-center">
                      <Button
                        variant="primary"
                        type="submit"
                        className="mt-3 next-button"
                      >
                        Next
                      </Button>
                    </div>
                  </Form>
                </Tab>
                <Tab eventKey="upload" title="Upload">
                  <Form className="mt-3" onSubmit={handleUploadSubmit}>
                    <Form.Group controlId="cv">
                      <Form.Label>Upload CV</Form.Label>
                      <Form.Control
                        type="file"
                        id="cv"
                        onChange={handleFileChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="personalLetter" className="mt-3">
                      <Form.Label>Upload Personal Letter</Form.Label>
                      <Form.Control
                        type="file"
                        id="personalLetter"
                        onChange={handleFileChange}
                      />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                      <Button
                        variant="primary"
                        type="submit"
                        className="mt-3 save-button"
                      >
                        Save
                      </Button>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                      <Button
                        variant="success"
                        type="button"
                        onClick={handleContinue}
                        className="continue-button"
                      >
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
