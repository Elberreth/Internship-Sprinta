import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';  // Lägg till denna import
import './../CSS/AdminPage.css';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rolesPerPage = 10;
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem('roles')) || [];
    setRoles(storedRoles);
  }, []);

  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = roles.slice(indexOfFirstRole, indexOfLastRole);

  const handleNextPage = () => {
    const nextPageRoles = roles.slice(indexOfLastRole, indexOfLastRole + rolesPerPage);
    if (nextPageRoles.length === 0) {
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
      let aValue, bValue;

      switch (field) {
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

    setRoles(sortedRoles);
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
          onClick={() => handleSort('name')}
        >
          <strong>Name</strong>
          <span style={{ marginLeft: '5px' }}>{getSortIcon('name')}</span>
        </div>
        <div
          className="col-2"
          style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          onClick={() => handleSort('department')}
        >
          <strong>Department</strong>
          <span style={{ marginLeft: '5px' }}>{getSortIcon('department')}</span>
        </div>
        <div
          className="col-2 text-center"
          style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          onClick={() => handleSort('email')}
        >
          <strong>Email</strong>
          <span style={{ marginLeft: '5px' }}>{getSortIcon('email')}</span>
        </div>
        <div
          className="col-2"
          style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          onClick={() => handleSort('phone')}
        >
          <strong>Phone</strong>
          <span style={{ marginLeft: '5px' }}>{getSortIcon('phone')}</span>
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
            <input type="checkbox" />
          </div>
          <div className="col-2 d-flex justify-content-center align-items-center">
            <div>{role.name}</div>
          </div>
          <div className="col-2 d-flex justify-content-center align-items-center">
            <div>{role.department}</div>
          </div>
          <div className="col-2 d-flex justify-content-center align-items-center">
            <div>{role.email}</div>
          </div>
          <div className="col-2 d-flex justify-content-center align-items-center">
            <div>{role.phone}</div>
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
    </div>
  );
};

export default Roles;


