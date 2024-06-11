import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab, Button, Modal } from 'react-bootstrap';
import './../CSS/Companies.css';
import cities from '../Utils/Cities'; // Importera cities

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 10;
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCompany, setNewCompany] = useState({ name: '', number: '', city: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedCompanies = JSON.parse(localStorage.getItem('companies')) || [];
    setCompanies(storedCompanies);
  }, []);

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = companies.slice(indexOfFirstCompany, indexOfLastCompany);

  const handleNextPage = () => {
    const nextPageCompanies = companies.slice(indexOfLastCompany, indexOfLastCompany + companiesPerPage);
    if (nextPageCompanies.length === 0) {
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

    const sortedCompanies = [...companies].sort((a, b) => {
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

    setCompanies(sortedCompanies);
    setSortConfig({ key: field, direction });
  };

  const getSortIcon = (field) => {
    if (sortConfig.key !== field) {
      return '▼';
    }
    return sortConfig.direction === 'asc' ? '▲' : '▼';
  };

  const handleAddCompany = () => {
    const validationErrors = {};
    if (!newCompany.name) validationErrors.name = 'Organisation Name is required';
    if (!newCompany.number) validationErrors.number = 'Organisation Number is required';
    if (!newCompany.city) validationErrors.city = 'City is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const updatedCompanies = [...companies, { ...newCompany, id: companies.length + 1 }];
      setCompanies(updatedCompanies);
      localStorage.setItem('companies', JSON.stringify(updatedCompanies));
      setShowAddModal(false);
      setNewCompany({ name: '', number: '', city: '' });
      setErrors({});
    }
  };

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompany((prevCompany) => ({ ...prevCompany, [name]: value }));
  };

  return (
    <div className="container">
      <Tabs defaultActiveKey="add" id="companies-tabs" className="mb-3">
        <Tab eventKey="add" title="Add New">
          <div className="form-group">
            <label htmlFor="name">Organisation Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={newCompany.name}
              onChange={handleInputChange}
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="number">Organisation Number</label>
            <input
              type="text"
              className="form-control"
              id="number"
              name="number"
              value={newCompany.number}
              onChange={handleInputChange}
            />
            {errors.number && <div className="error">{errors.number}</div>}
          </div>
          <div className="form-group">
            <select
              className="form-control"
              id="city"
              name="city"
              value={newCompany.city}
              onChange={handleInputChange}
            >
              <option value="">Select City</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
            {errors.city && <div className="error">{errors.city}</div>}
          </div>
          <div className="d-flex justify-content-center">
            <Button
              variant="primary"
              className="btn-sm-custom btn-smaller"
              onClick={handleShowAddModal}
            >
              Add New Company
            </Button>
          </div>
          <Modal show={showAddModal} onHide={handleCloseAddModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Add</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to add this company?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAddModal} className="btn-sm-popup">
                Cancel
              </Button>
              <Button variant="primary" onClick={handleAddCompany} className="btn-sm-popup">
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </Tab>
        <Tab eventKey="view" title="View All">
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
              onClick={() => handleSort('industry')}
            >
              <strong>Industry</strong>
              <span style={{ marginLeft: '5px' }}>{getSortIcon('industry')}</span>
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
          {currentCompanies.map((company, index) => (
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
                <div>{company.name}</div>
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <div>{company.industry}</div>
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <div>{company.email}</div>
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <div>{company.phone}</div>
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
              {indexOfLastCompany < companies.length && (
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
        </Tab>
      </Tabs>
    </div>
  );
};

export default Companies;
















