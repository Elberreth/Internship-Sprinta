import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import './../CSS/AdminPage.css';

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('acceptedUsers')) || [];
    setAllUsers(storedUsers);
  }, []);

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
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(user.id)}
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
            onClick={handleRemove}
            disabled={checkedUsers.length === 0}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;









