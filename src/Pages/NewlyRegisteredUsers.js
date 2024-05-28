import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const NewlyRegisteredUsers = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleViewMoreClick = (user) => {
    setSelectedUser(user);
  };

  const handleClose = () => {
    setSelectedUser(null);
  };

  return (
    <div>
     
      {[
        { name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', address: '123 Main St' },
        { name: 'Jane Doe', email: 'jane.doe@example.com', phone: '098-765-4321', address: '456 Elm St' },
        // Add more users here
      ].map((user, index) => (
        <div key={index}>
          <div>Name: {user.name}</div>
          <div>Email: {user.email}</div>
          <button type="button" onClick={() => handleViewMoreClick(user)}>View more</button>
        </div>
      ))}
      <Modal show={!!selectedUser} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedUser?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Email: {selectedUser?.email}</div>
          <div>Phone: {selectedUser?.phone}</div>
          <div>Address: {selectedUser?.address}</div>
          {/* Add more information here */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewlyRegisteredUsers;
