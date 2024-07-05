import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import '../CSS/UserProfile.css';

const UserProfileHobbies = ({ hobbies, handleCheckboxChange }) => {
  return (
    <Form.Group className="mt-3 hobbies-form-group">
      <Form.Label className="d-block text-center hobbies-form-label">What are your hobbies?</Form.Label>
      <Row className="hobbies-checkbox-row">
        <Col xs={6} md={4} lg={3} className="hobbies-checkbox-col">
          <Form.Check
            type="checkbox"
            label="Reading"
            name="reading"
            checked={hobbies.reading}
            onChange={handleCheckboxChange}
          />
          <Form.Check
            type="checkbox"
            label="Traveling"
            name="traveling"
            checked={hobbies.traveling}
            onChange={handleCheckboxChange}
          />
          <Form.Check
            type="checkbox"
            label="Cooking"
            name="cooking"
            checked={hobbies.cooking}
            onChange={handleCheckboxChange}
          />
          <Form.Check
            type="checkbox"
            label="Sports"
            name="sports"
            checked={hobbies.sports}
            onChange={handleCheckboxChange}
          />
          <Form.Check
            type="checkbox"
            label="Music"
            name="music"
            checked={hobbies.music}
            onChange={handleCheckboxChange}
          />
        </Col>
        <Col xs={6} md={4} lg={3} className="hobbies-checkbox-col">
          <Form.Check
            type="checkbox"
            label="Fishing"
            name="fishing"
            checked={hobbies.fishing}
            onChange={handleCheckboxChange}
          />
          <Form.Check
            type="checkbox"
            label="Skiing"
            name="skiing"
            checked={hobbies.skiing}
            onChange={handleCheckboxChange}
          />
          <Form.Check
            type="checkbox"
            label="Climbing"
            name="climbing"
            checked={hobbies.climbing}
            onChange={handleCheckboxChange}
          />
          <Form.Check
            type="checkbox"
            label="Gaming"
            name="gaming"
            checked={hobbies.gaming}
            onChange={handleCheckboxChange}
          />
          <Form.Check
            type="checkbox"
            label="IT"
            name="it"
            checked={hobbies.it}
            onChange={handleCheckboxChange}
          />
        </Col>
        <Col xs={6} md={4} lg={3} className="hobbies-checkbox-col">
          <Form.Check
            type="checkbox"
            label="Movies"
            name="movies"
            checked={hobbies.movies}
            onChange={handleCheckboxChange}
          />
          <Form.Check
            type="checkbox"
            label="Writing"
            name="writing"
            checked={hobbies.writing}
            onChange={handleCheckboxChange}
          />
          <Form.Check
            type="checkbox"
            label="Gardening"
            name="gardening"
            checked={hobbies.gardening}
            onChange={handleCheckboxChange}
          />
          <Form.Check
            type="checkbox"
            label="Training"
            name="running"
            checked={hobbies.running}
            onChange={handleCheckboxChange}
          />
          <Form.Check
            type="checkbox"
            label="Meditate"
            name="meditate"
            checked={hobbies.meditate}
            onChange={handleCheckboxChange}
          />
        </Col>
        <Col xs={6} md={4} lg={3} className="hobbies-checkbox-col">
          <Form.Check
            type="checkbox"
            label="Decoration"
            name="decoration"
            checked={hobbies.decoration}
            onChange={handleCheckboxChange}
          />
          <Form.Check
            type="checkbox"
            label="Charity"
            name="charity"
            checked={hobbies.charity}
            onChange={handleCheckboxChange}
          />
          <Form.Check
            type="checkbox"
            label="Nature"
            name="nature"
            checked={hobbies.nature}
            onChange={handleCheckboxChange}
          />
          <Form.Check
            type="checkbox"
            label="Animals"
            name="animals"
            checked={hobbies.animals}
            onChange={handleCheckboxChange}
          />
          <Form.Check
            type="checkbox"
            label="Other"
            name="other"
            checked={hobbies.other}
            onChange={handleCheckboxChange}
          />
        </Col>
      </Row>
    </Form.Group>
  );
};

export default UserProfileHobbies;





