import React from 'react';
import { Form } from 'react-bootstrap';

const UserProfileHobbies = ({ hobbies, handleCheckboxChange }) => {
  return (
    <Form.Group className="mt-3">
      <Form.Label>What are your hobbies?</Form.Label>
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
    </Form.Group>
  );
};

export default UserProfileHobbies;
