import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const NewlyRegisteredUsers = () => {
  const [newUsers, setNewUsers] = useState([
    { id: 1, name: 'Kurt Kurtson', email: 'kurt@xbus.com', company: 'XBUS', employed: true },
    { id: 2, name: 'Conny Connysson', email: 'conny@example.com', company: 'EXCEED', employed: false },
    { id: 3, name: 'Daniel Carlsson', email: 'unix555@gmail.com', company: 'Sprinta', employed: false },
    { id: 4, name: 'John Doe', email: 'john.doe@example.com', company: 'Company A', employed: true },
    { id: 5, name: 'Jane Doe', email: 'jane.doe@example.com', company: 'Company B', employed: false },
    { id: 6, name: 'Alice Smith', email: 'alice.smith@example.com', company: 'Company C', employed: true },
    { id: 7, name: 'Bob Johnson', email: 'bob.johnson@example.com', company: 'Company D', employed: false },
    { id: 8, name: 'Emma Brown', email: 'emma.brown@example.com', company: 'Company E', employed: true },
    { id: 9, name: 'William Taylor', email: 'william.taylor@example.com', company: 'Company F', employed: false },
    { id: 10, name: 'Olivia Wilson', email: 'olivia.wilson@example.com', company: 'Company G', employed: true },
    { id: 11, name: 'James Anderson', email: 'james.anderson@example.com', company: 'Company H', employed: false },
    { id: 12, name: 'Sophia Martinez', email: 'sophia.martinez@example.com', company: 'Company I', employed: true }
  ]);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);

  const handleCheckboxChange = (userId) => {
    if (checkedUsers.includes(userId)) {
      setCheckedUsers(checkedUsers.filter(id => id !== userId));
    } else {
      setCheckedUsers([...checkedUsers, userId]);
    }
  };

  const handleAction = (action) => {
    setModalAction(action);
    setShowModal(true);
  };

  const handleConfirmAction = () => {
    if (modalAction === 'accept') {
      const newlyAcceptedUsers = checkedUsers;
      setNewUsers(newUsers.filter(user => !newlyAcceptedUsers.includes(user.id)));
    } else if (modalAction === 'reject') {
      const newlyRejectedUsers = checkedUsers;
      setNewUsers(newUsers.filter(user => !newlyRejectedUsers.includes(user.id)));
    }
    setCheckedUsers([]);
    setShowModal(false);
  };

  return (
    <div className="container">
      {/* Header row */}
      <div className="row border p-3 text-center">
        <div className="col"><strong>Select</strong></div>
        <div className="col"><strong>Last Name</strong></div>
        <div className="col"><strong>First Name</strong></div>
        <div className="col"><strong>E-mail</strong></div>
        <div className="col"><strong>Company</strong></div>
        <div className="col"><strong>Employed</strong></div>
      </div>
      {/* Users */}
      {newUsers.map((user, index) => (
        <div key={index} className="row border-top p-3 text-center">
          <div className="col d-flex justify-content-center">
            <input type="checkbox" onChange={() => handleCheckboxChange(user.id)} checked={checkedUsers.includes(user.id)} />
          </div>
          <div className="col">{user.name.split(' ')[1]}</div>
          <div className="col">{user.name.split(' ')[0]}</div>
          <div className="col">{user.email}</div>
          <div className="col">{user.company}</div>
          <div className="col">{user.employed ? 'Yes' : 'No'}</div>
        </div>
      ))}
      {/* Accept and Reject buttons */}
      <div className="row mt-3" style={{ maxWidth: '200px', margin: 'auto' }}>
        <div className="col d-flex justify-content-center">
          <Button
            variant="primary"
            className="btn-sm-custom mr-2"
            onClick={() => handleAction('accept')}
            disabled={checkedUsers.length === 0}
          >
            Accept
          </Button>
          <Button
            variant="danger"
            className="btn-sm-custom"
            onClick={() => handleAction('reject')}
            disabled={checkedUsers.length === 0}
          >
            Reject
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to {modalAction} the selected users?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="btn-sm-popup" onClick={handleConfirmAction}>
            Confirm
          </Button>
          <Button variant="secondary" className="btn-sm-popup" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewlyRegisteredUsers;

































