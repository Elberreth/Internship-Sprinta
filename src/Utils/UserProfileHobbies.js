import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const UserProfileHobbies = ({ hobbies, handleCheckboxChange }) => {
  const hobbyOptions = [
    { label: "Reading", name: "reading" },
    { label: "Traveling", name: "traveling" },
    { label: "Cooking", name: "cooking" },
    { label: "Sports", name: "sports" },
    { label: "Music", name: "music" },
    { label: "Fishing", name: "fishing" },
    { label: "Skiing", name: "skiing" },
    { label: "Climbing", name: "climbing" },
    { label: "Gaming", name: "gaming" },
    { label: "IT", name: "it" },
    { label: "Movies", name: "movies" },
    { label: "Writing", name: "writing" },
    { label: "Gardening", name: "gardening" },
  ];

  return (
    <Form.Group className="mt-3">
      <Form.Label className="d-flex justify-content-center">What are your hobbies?</Form.Label>
      <Row>
        {hobbyOptions.map((hobby, index) => (
          <Col xs={6} md={4} lg={2} key={index} className="mb-2">
            <Form.Check
              type="checkbox"
              label={hobby.label}
              name={hobby.name}
              checked={hobbies[hobby.name]}
              onChange={handleCheckboxChange}
            />
          </Col>
        ))}
      </Row>
    </Form.Group>
  );
};

export default UserProfileHobbies;

