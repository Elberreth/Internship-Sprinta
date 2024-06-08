import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './../CSS/AdminPage.css';

const NewlyRegisteredUsers = () => {
  const [newUsers, setNewUsers] = useState([
    { id: 1, name: 'Kurt Kurtson', email: 'kurt@xbus.com', company: 'XBUS', employed: true },
    { id: 2, name: 'Conny Connysson', email: 'conny@example.com', company: 'EXCEED', employed: false },
    { id: 3, name: 'Daniel Carlsson', email: 'unix555@gmail.com', company: 'Sprinta', employed: false },
    { id: 4, name: 'John Doe', email: 'john.doe@example.com', company: 'Company A', employed: true },
    { id: 5, name: 'Jane Doe', email: 'jane.doe@example.com', company: 'Company B', employed: false },
    { id: 6, name: 'Alice Smith', email: 'alice.smith@example.com', company: 'Company C', employed: true },
    { id: 7, name: 'Bob Johnson', email: 'bob.johnson@example.com', company: 'Company D', employed: false },
    { id: 8, name: 'Emma Brown', email: 'emma.brown@example.com', company: 'Progress Lead', employed: true },
    { id: 9, name: 'William Taylor', email: 'william.taylor@example.com', company: 'Company F', employed: false },
    { id: 10, name: 'Olivia Wilson', email: 'olivia.wilson@example.com', company: 'Company G', employed: true },
    { id: 11, name: 'James Anderson', email: 'james.anderson@example.com', company: 'Company H', employed: false },
    { id: 12, name: 'Sophia Martinez', email: 'sophia.martinez@example.com', company: 'Company I', employed: true }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const navigate = useNavigate();

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
    let updatedUsers;
    let newlyAcceptedUsers = [];
    if (modalAction === 'accept') {
      newlyAcceptedUsers = checkedUsers;
      updatedUsers = newUsers.filter(user => !newlyAcceptedUsers.includes(user.id));
      const acceptedUsers = newUsers.filter(user => newlyAcceptedUsers.includes(user.id));
      const existingAcceptedUsers = JSON.parse(localStorage.getItem('acceptedUsers')) || [];

      // Undvik dubletter
      const uniqueAcceptedUsers = acceptedUsers.filter(newUser => 
        !existingAcceptedUsers.some(existingUser => existingUser.id === newUser.id)
      );

      localStorage.setItem('acceptedUsers', JSON.stringify([...existingAcceptedUsers, ...uniqueAcceptedUsers]));
    } else if (modalAction === 'reject') {
      const newlyRejectedUsers = checkedUsers;
      updatedUsers = newUsers.filter(user => !newlyRejectedUsers.includes(user.id));
    }

    setNewUsers(updatedUsers);
    setCheckedUsers([]);
    setShowModal(false);

    // Om den aktuella sidan är tom efter uppdateringen, gå till första sidan
    if (updatedUsers.length <= (currentPage - 1) * usersPerPage && currentPage > 1) {
      setCurrentPage(1);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = newUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleNextPage = () => {
    const nextPageUsers = newUsers.slice(indexOfLastUser, indexOfLastUser + usersPerPage);
    if (nextPageUsers.length === 0) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSort = (field) => {
    let direction = 'asc';
    if (sortConfig.key === field && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedUsers = [...newUsers].sort((a, b) => {
      let aValue, bValue;

      switch (field) {
        case 'lastName':
          aValue = a.name.split(' ')[1];
          bValue = b.name.split(' ')[1];
          break;
        case 'firstName':
          aValue = a.name.split(' ')[0];
          bValue = b.name.split(' ')[0];
          break;
        default:
          aValue = a[field];
          bValue = b[field];
      }

      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setNewUsers(sortedUsers);
    setSortConfig({ key: field, direction });
  };

  const getSortIcon = (field) => {
    if (sortConfig.key !== field) {
      return '▼';
    }
    return sortConfig.direction === 'asc' ? '▲' : '▼';
  };

  return (
    <div className="container">
      <div className="row border p-3 text-center">
        <div className="col-1"><strong>Select</strong></div>
        <div
          className="col-2"
          style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          onClick={() => handleSort('lastName')}
        >
          <strong>Last Name</strong>
          <span style={{ marginLeft: '5px' }}>{getSortIcon('lastName')}</span>
        </div>
        <div
          className="col-2"
          style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          onClick={() => handleSort('firstName')}
        >
          <strong>First Name</strong>
          <span style={{ marginLeft: '5px' }}>{getSortIcon('firstName')}</span>
        </div>
        <div
          className="col-2 text-center"
          style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          onClick={() => handleSort('email')}
        >
          <strong>E-mail</strong>
          <span style={{ marginLeft: '5px' }}>{getSortIcon('email')}</span>
        </div>
        <div
          className="col-2"
          style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          onClick={() => handleSort('company')}
        >
          <strong>Company</strong>
          <span style={{ marginLeft: '5px' }}>{getSortIcon('company')}</span>
        </div>
        <div
          className="col-2"
          style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          onClick={() => handleSort('employed')}
        >
          <strong>Employed</strong>
          <span style={{ marginLeft: '5px' }}>{getSortIcon('employed')}</span>
        </div>
      </div>
      {currentUsers.map((user, index) => (
        <div
          key={index}
          className="row border-top p-3 text-center align-items-center user-row"
          style={{ transition: 'background-color 0.3s' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f0f0'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
        >
          <div className="col-1 d-flex justify-content-center">
            <input type="checkbox" onChange={() => handleCheckboxChange(user.id)} checked={checkedUsers.includes(user.id)} />
          </div>
          <div className="col-2 d-flex justify-content-center align-items-center">
            <div>{user.name.split(' ')[1]}</div>
          </div>
          <div className="col-2 d-flex justify-content-center align-items-center">
            <div>{user.name.split(' ')[0]}</div>
          </div>
          <div className="col-2 d-flex justify-content-center align-items-center">
            <div>{user.email}</div>
          </div>
          <div className="col-2 d-flex justify-content-center align-items-center">
            <div>{user.company}</div>
          </div>
          <div className="col-2 d-flex justify-content-center align-items-center">
            <div>{user.employed ? 'Yes' : 'No'}</div>
          </div>
        </div>
      ))}
      <div className="d-flex justify-content-between mt-3">
        <div>
          <Button
            variant="primary"
            className="pagination-btn"
            onClick={handlePreviousPage}
            style={{ display: currentPage === 1 ? 'none' : 'inline-block' }}
            disabled={currentPage === 1}
          >
            Previous Page
          </Button>
        </div>
        <div className="ml-auto">
          {indexOfLastUser < newUsers.length && (
            <Button
              variant="primary"
              className="pagination-btn"
              onClick={handleNextPage}
            >
              Next Page
            </Button>
          )}
        </div>
      </div>
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



























































