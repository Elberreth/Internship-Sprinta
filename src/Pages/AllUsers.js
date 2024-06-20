import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import './../CSS/AdminPage.css';
import employers from '../Utils/Employers'; // Importera företag från Employers-filen

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    company: '',
    employed: false
  });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('acceptedUsers')) || [];
    setAllUsers(storedUsers);
  }, []);

  useEffect(() => {
    if ((currentPage - 1) * usersPerPage >= allUsers.length && currentPage > 1) {
      setCurrentPage(1);
    }
  }, [allUsers, currentPage]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleNextPage = () => {
    const nextPageUsers = allUsers.slice(indexOfLastUser, indexOfLastUser + usersPerPage);
    if (nextPageUsers.length === 0) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleCheckboxChange = (userId) => {
    if (checkedUsers.includes(userId)) {
      setCheckedUsers(checkedUsers.filter(id => id !== userId));
    } else {
      setCheckedUsers([...checkedUsers, userId]);
    }
  };

  const handleRemove = () => {
    const updatedUsers = allUsers.filter(user => !checkedUsers.includes(user.id));
    setAllUsers(updatedUsers);
    localStorage.setItem('acceptedUsers', JSON.stringify(updatedUsers));
    setCheckedUsers([]);
    setShowRemoveModal(false);
  };

  const handleSort = (field) => {
    let direction = 'asc';
    if (sortConfig.key === field && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedUsers = [...allUsers].sort((a, b) => {
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

    setAllUsers(sortedUsers);
    setSortConfig({ key: field, direction });
  };

  const getSortIcon = (field) => {
    if (sortConfig.key !== field) {
      return '▼';
    }
    return sortConfig.direction === 'asc' ? '▲' : '▼';
  };

  const handleRowClick = (user) => {
    setSelectedUser(user.id);
    setEditUser({
      firstname: user.name.split(' ')[0],
      lastname: user.name.split(' ')[1],
      email: user.email,
      company: user.company,
      employed: user.employed
    });
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleEmployedChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prevUser) => ({ ...prevUser, [name]: value === 'true' }));
  };

  const handleSaveEdit = () => {
    const updatedUsers = allUsers.map((user) =>
      user.id === selectedUser ? { ...user, ...editUser, name: `${editUser.firstname} ${editUser.lastname}` } : user
    );
    setAllUsers(updatedUsers);
    localStorage.setItem('acceptedUsers', JSON.stringify(updatedUsers));
    setShowEditModal(false);
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
          onClick={(e) => {
            if (e.target.type !== 'checkbox') {
              handleRowClick(user);
            }
          }}
        >
          <div className="col-1 d-flex justify-content-center">
            <input
              type="checkbox"
              onChange={(e) => { handleCheckboxChange(user.id); }}
              checked={checkedUsers.includes(user.id)}
            />
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
          {indexOfLastUser < allUsers.length && (
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
            variant="danger"
            className="btn-sm-popup"
            onClick={() => setShowRemoveModal(true)}
            disabled={checkedUsers.length === 0}
          >
            Remove
          </Button>
        </div>
      </div>
      <Modal show={showRemoveModal} onHide={() => setShowRemoveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="centered-modal-title">Confirm Remove</Modal.Title>
        </Modal.Header>
        <Modal.Body className="centered-modal-body">Are you sure you want to remove the selected users?</Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="secondary" className="btn-sm-popup" onClick={() => setShowRemoveModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" className="btn-sm-popup" onClick={handleRemove}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="centered-modal-title">Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group half-width">
            <label htmlFor="edit-firstname" className="bold-label">First Name</label>
            <input
              type="text"
              className="form-control"
              id="edit-firstname"
              name="firstname"
              value={editUser.firstname}
              onChange={handleEditInputChange}
            />
          </div>
          <div className="form-group half-width">
            <label htmlFor="edit-lastname" className="bold-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="edit-lastname"
              name="lastname"
              value={editUser.lastname}
              onChange={handleEditInputChange}
            />
          </div>
          <div className="form-group half-width">
            <label htmlFor="edit-email" className="bold-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="edit-email"
              name="email"
              value={editUser.email}
              onChange={handleEditInputChange}
            />
          </div>
          <div className="form-group half-width">
            <label htmlFor="edit-company" className="bold-label">Company</label>
            <select
              className="form-control"
              id="edit-company"
              name="company"
              value={editUser.company}
              onChange={handleEditInputChange}
            >
              <option value="">Select Company</option>
              {employers.map((employer) => (
                <option key={employer} value={employer}>{employer}</option>
              ))}
            </select>
          </div>
          <div className="form-group half-width">
            <label htmlFor="edit-employed" className="bold-label">Employed</label>
            <select
              className="form-control"
              id="edit-employed"
              name="employed"
              value={editUser.employed}
              onChange={handleEmployedChange}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="secondary" className="btn-sm-popup" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" className="btn-sm-popup wide-button" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllUsers;















