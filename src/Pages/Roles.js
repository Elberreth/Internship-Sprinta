import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab, Button, Modal } from 'react-bootstrap';
import '../CSS/AdminPage.css';
import employers from '../Utils/Employers';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rolesPerPage = 10;
  const usersPerPage = 10;
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [userSortConfig, setUserSortConfig] = useState({ key: null, direction: null });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [newRole, setNewRole] = useState({ name: '' });
  const [newUser, setNewUser] = useState({ firstname: '', lastname: '', email: '', employer: '', role: '' });
  const [errors, setErrors] = useState({});
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [removeType, setRemoveType] = useState(null);

  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem('roles')) || [];
    setRoles(storedRoles);
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = roles.slice(indexOfFirstRole, indexOfLastRole);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handleNextPage = () => {
    const nextPageRoles = roles.slice(indexOfLastRole, indexOfLastRole + rolesPerPage);
    const nextPageUsers = users.slice(indexOfLastUser, indexOfLastUser + usersPerPage);
    if (nextPageRoles.length === 0 && nextPageUsers.length === 0) {
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

    const sortedRoles = [...roles].sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];

      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setRoles(sortedRoles);
    setSortConfig({ key: field, direction });
  };

  const handleUserSort = (field) => {
    let direction = 'asc';
    if (userSortConfig.key === field && userSortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedUsers = [...users].sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];

      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setUsers(sortedUsers);
    setUserSortConfig({ key: field, direction });
  };

  const getSortIcon = (field) => {
    if (sortConfig.key !== field) {
      return '▼';
    }
    return sortConfig.direction === 'asc' ? '▲' : '▼';
  };

  const getUserSortIcon = (field) => {
    if (userSortConfig.key !== field) {
      return '▼';
    }
    return userSortConfig.direction === 'asc' ? '▲' : '▼';
  };

  const handleAddRole = () => {
    const validationErrors = {};
    if (!newRole.name) validationErrors.name = 'Role Name is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const updatedRoles = [...roles, { ...newRole, id: roles.length + 1 }];
      setRoles(updatedRoles);
      localStorage.setItem('roles', JSON.stringify(updatedRoles));
      setShowAddModal(false);
      setNewRole({ name: '' });
      setErrors({});
      setSuccessMessage('Role added successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleShowAddModal = () => {
    const validationErrors = {};
    if (!newRole.name) validationErrors.name = 'Role Name is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setShowAddModal(true);
    }
  };

  const handleCloseAddModal = () => setShowAddModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRole((prevRole) => ({ ...prevRole, [name]: value }));
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleAddUser = () => {
    const validationErrors = {};
    if (!newUser.firstname) validationErrors.firstname = 'First Name is required';
    if (!newUser.lastname) validationErrors.lastname = 'Last Name is required';
    if (!newUser.email) validationErrors.email = 'Email is required';
    if (!newUser.employer) validationErrors.employer = 'Employer is required';
    if (!newUser.role) validationErrors.role = 'Role is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const updatedUsers = [...users, { ...newUser, id: users.length + 1 }];
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setNewUser({ firstname: '', lastname: '', email: '', employer: '', role: '' });
      setErrors({});
      setSuccessMessage('User added successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleRemoveRole = () => {
    const updatedRoles = roles.filter(role => role.id !== selectedRole);
    setRoles(updatedRoles);
    localStorage.setItem('roles', JSON.stringify(updatedRoles));
    setShowRemoveModal(false);
  };

  const handleRemoveUser = () => {
    const updatedUsers = users.filter(user => user.id !== selectedUser);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setShowRemoveModal(false);
  };

  const handleEditRole = () => {
    const updatedRoles = roles.map(role =>
      role.id === selectedRole ? { ...role, ...newRole } : role
    );
    setRoles(updatedRoles);
    localStorage.setItem('roles', JSON.stringify(updatedRoles));
    setShowEditModal(false);
    setNewRole({ name: '' });
  };

  const handleEditUser = () => {
    const updatedUsers = users.map(user =>
      user.id === selectedUser ? { ...user, ...newUser } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setShowEditUserModal(false);
    setNewUser({ firstname: '', lastname: '', email: '', employer: '', role: '' });
  };

  const handleShowRemoveModal = (id, type) => {
    if (type === 'role') {
      setSelectedRole(id);
      setRemoveType('role');
    } else if (type === 'user') {
      setSelectedUser(id);
      setRemoveType('user');
    }
    setShowRemoveModal(true);
  };

  const handleShowEditModal = (role) => {
    setSelectedRole(role.id);
    setNewRole({ name: role.name });
    setShowEditModal(true);
  };

  const handleShowEditUserModal = (user) => {
    setSelectedUser(user.id);
    setNewUser({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      employer: user.employer,
      role: user.role
    });
    setShowEditUserModal(true);
  };

  const confirmRemove = () => {
    if (removeType === 'role') {
      handleRemoveRole();
    } else if (removeType === 'user') {
      handleRemoveUser();
    }
  };

  return (
    <div className="container">
      <Tabs defaultActiveKey="viewUsers" id="roles-tabs" className="mb-3">
        <Tab eventKey="viewUsers" title="Admins">
          <div className="row border p-3 text-center">
            <div className="col-1"><strong>Select</strong></div>
            <div
              className="col-2"
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              onClick={() => handleUserSort('firstname')}
            >
              <strong>First Name</strong>
              <span style={{ marginLeft: '5px' }}>{getUserSortIcon('firstname')}</span>
            </div>
            <div
              className="col-2"
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              onClick={() => handleUserSort('lastname')}
            >
              <strong>Last Name</strong>
              <span style={{ marginLeft: '5px' }}>{getUserSortIcon('lastname')}</span>
            </div>
            <div
              className="col-2"
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              onClick={() => handleUserSort('email')}
            >
              <strong>Email</strong>
              <span style={{ marginLeft: '5px' }}>{getUserSortIcon('email')}</span>
            </div>
            <div
              className="col-2"
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              onClick={() => handleUserSort('employer')}
            >
              <strong>Employer</strong>
              <span style={{ marginLeft: '5px' }}>{getUserSortIcon('employer')}</span>
            </div>
            <div
              className="col-2"
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              onClick={() => handleUserSort('role')}
            >
              <strong>Role</strong>
              <span style={{ marginLeft: '5px' }}>{getUserSortIcon('role')}</span>
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
                <input
                  type="checkbox"
                  onChange={() => setSelectedUser(user.id)}
                  checked={selectedUser === user.id}
                />
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <div>{user.firstname}</div>
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <div>{user.lastname}</div>
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <div>{user.email}</div>
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <div>{user.employer}</div>
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <div>{user.role}</div>
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
              {indexOfLastUser < users.length && (
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
          <div className="d-flex justify-content-center mt-3">
            <Button
              variant="danger"
              className="btn-sm-custom common-btn"
              onClick={() => handleShowRemoveModal(selectedUser, 'user')}
              disabled={!selectedUser}
            >
              Remove
            </Button>
            <Button
              variant="primary"
              className="btn-sm-custom common-btn"
              onClick={() => handleShowEditUserModal(currentUsers.find(user => user.id === selectedUser))}
              disabled={!selectedUser}
            >
              Edit
            </Button>
          </div>
          <Modal show={showRemoveModal} onHide={() => setShowRemoveModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title className="centered-modal-title">Confirm Remove</Modal.Title>
            </Modal.Header>
            <Modal.Body className="centered-modal-body">Are you sure you want to remove this user?</Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <Button variant="secondary" onClick={() => setShowRemoveModal(false)} className="btn-sm-popup">
                Cancel
              </Button>
              <Button variant="primary" onClick={confirmRemove} className="btn-sm-popup">
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showEditUserModal} onHide={() => setShowEditUserModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title className="centered-modal-title">Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group half-width">
                <label htmlFor="edit-user-firstname" className="bold-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="edit-user-firstname"
                  name="firstname"
                  value={newUser.firstname}
                  onChange={handleUserInputChange}
                />
                {errors.firstname && <div className="error">{errors.firstname}</div>}
              </div>
              <div className="form-group half-width">
                <label htmlFor="edit-user-lastname" className="bold-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="edit-user-lastname"
                  name="lastname"
                  value={newUser.lastname}
                  onChange={handleUserInputChange}
                />
                {errors.lastname && <div className="error">{errors.lastname}</div>}
              </div>
              <div className="form-group half-width">
                <label htmlFor="edit-user-email" className="bold-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="edit-user-email"
                  name="email"
                  value={newUser.email}
                  onChange={handleUserInputChange}
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>
              <div className="form-group half-width">
                <label htmlFor="edit-user-employer" className="bold-label">Employer</label>
                <select
                  className="form-control"
                  id="edit-user-employer"
                  name="employer"
                  value={newUser.employer}
                  onChange={handleUserInputChange}
                >
                  <option value="">Select Employer</option>
                  {employers.map(employer => (
                    <option key={employer} value={employer}>{employer}</option>
                  ))}
                </select>
                {errors.employer && <div className="error">{errors.employer}</div>}
              </div>
              <div className="form-group half-width">
                <label htmlFor="edit-user-role" className="bold-label">Role</label>
                <select
                  className="form-control"
                  id="edit-user-role"
                  name="role"
                  value={newUser.role}
                  onChange={handleUserInputChange}
                >
                  <option value="">Select Role</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.name}>{role.name}</option>
                  ))}
                </select>
                {errors.role && <div className="error">{errors.role}</div>}
              </div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <Button variant="secondary" onClick={() => setShowEditUserModal(false)} className="btn-sm-popup">
                Cancel
              </Button>
              <Button variant="primary" onClick={handleEditUser} className="btn-sm-popup wide-button">
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Tab>
        <Tab eventKey="addUser" title="Add Admin">
          <div className="form-group half-width">
            <label htmlFor="userFirstname" className="bold-label">First Name</label>
            <input
              type="text"
              className="form-control"
              id="userFirstname"
              name="firstname"
              value={newUser.firstname}
              onChange={handleUserInputChange}
            />
            {errors.firstname && <div className="error">{errors.firstname}</div>}
          </div>
          <div className="form-group half-width">
            <label htmlFor="userLastname" className="bold-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="userLastname"
              name="lastname"
              value={newUser.lastname}
              onChange={handleUserInputChange}
            />
            {errors.lastname && <div className="error">{errors.lastname}</div>}
          </div>
          <div className="form-group half-width">
            <label htmlFor="userEmail" className="bold-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="userEmail"
              name="email"
              value={newUser.email}
              onChange={handleUserInputChange}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="form-group half-width">
            <label htmlFor="userEmployer" className="bold-label">Employer</label>
            <select
              className="form-control"
              id="userEmployer"
              name="employer"
              value={newUser.employer}
              onChange={handleUserInputChange}
            >
              <option value="">Select Employer</option>
              {employers.map(employer => (
                <option key={employer} value={employer}>{employer}</option>
              ))}
            </select>
            {errors.employer && <div className="error">{errors.employer}</div>}
          </div>
          <div className="form-group half-width">
            <label htmlFor="userRole" className="bold-label">Role</label>
            <select
              className="form-control"
              id="userRole"
              name="role"
              value={newUser.role}
              onChange={handleUserInputChange}
            >
              <option value="">Select Role</option>
              {roles.map(role => (
                <option key={role.id} value={role.name}>{role.name}</option>
              ))}
            </select>
            {errors.role && <div className="error">{errors.role}</div>}
          </div>
          <div className="d-flex justify-content-center">
            <Button
              variant="primary"
              className="btn-sm-custom wide-button"
              onClick={handleAddUser}
            >
              Add Admin
            </Button>
          </div>
          {successMessage && <div className="success">{successMessage}</div>}
        </Tab>
        <Tab eventKey="view" title="Roles">
          <div className="row border p-3 text-center">
            <div className="col-1"><strong>Select</strong></div>
            <div
              className="col-2"
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              onClick={() => handleSort('name')}
            >
              <strong>Role Name</strong>
              <span style={{ marginLeft: '5px' }}>{getSortIcon('name')}</span>
            </div>
          </div>
          {currentRoles.map((role, index) => (
            <div
              key={index}
              className="row border-top p-3 text-center align-items-center user-row"
              style={{ transition: 'background-color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f0f0'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
            >
              <div className="col-1 d-flex justify-content-center">
                <input
                  type="checkbox"
                  onChange={() => setSelectedRole(role.id)}
                  checked={selectedRole === role.id}
                />
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <div>{role.name}</div>
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
              {indexOfLastRole < roles.length && (
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
          <div className="d-flex justify-content-center mt-3">
            <Button
              variant="danger"
              className="btn-sm-custom common-btn"
              onClick={() => handleShowRemoveModal(selectedRole, 'role')}
              disabled={!selectedRole}
            >
              Remove
            </Button>
            <Button
              variant="primary"
              className="btn-sm-custom common-btn"
              onClick={() => handleShowEditModal(currentRoles.find(role => role.id === selectedRole))}
              disabled={!selectedRole}
            >
              Edit
            </Button>
          </div>
          <Modal show={showRemoveModal} onHide={() => setShowRemoveModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title className="centered-modal-title">Confirm Remove</Modal.Title>
            </Modal.Header>
            <Modal.Body className="centered-modal-body">Are you sure you want to remove this role?</Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <Button variant="secondary" onClick={() => setShowRemoveModal(false)} className="btn-sm-popup">
                Cancel
              </Button>
              <Button variant="primary" onClick={confirmRemove} className="btn-sm-popup">
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title className="centered-modal-title">Edit Role</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group half-width">
                <label htmlFor="edit-name" className="bold-label">Role Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="edit-name"
                  name="name"
                  value={newRole.name}
                  onChange={handleInputChange}
                />
                {errors.name && <div className="error">{errors.name}</div>}
              </div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <Button variant="secondary" onClick={() => setShowEditModal(false)} className="btn-sm-popup">
                Cancel
              </Button>
              <Button variant="primary" onClick={handleEditRole} className="btn-sm-popup wide-button">
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Tab>
        <Tab eventKey="add" title="Add Role">
          <div className="form-group half-width">
            <label htmlFor="name" className="bold-label">Role Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={newRole.name}
              onChange={handleInputChange}
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
          <div className="d-flex justify-content-center">
            <Button
              variant="primary"
              className="btn-sm-custom wide-button"
              onClick={handleShowAddModal}
            >
              Add Role
            </Button>
          </div>
          {successMessage && <div className="success">{successMessage}</div>}
          <Modal show={showAddModal} onHide={handleCloseAddModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Add</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to add this role?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAddModal} className="btn-sm-popup">
                Cancel
              </Button>
              <Button variant="primary" onClick={handleAddRole} className="btn-sm-popup">
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Roles;















