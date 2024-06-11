import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab, Button, Modal } from 'react-bootstrap';
import './../CSS/Companies.css';
import cities from '../Utils/Cities'; // Assuming this is your cities.js path

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 10;
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newCompany, setNewCompany] = useState({ name: '', number: '', city: '' });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [checkedCompanyId, setCheckedCompanyId] = useState(null);

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
      setSuccessMessage('Success');
    }
  };

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompany((prevCompany) => ({ ...prevCompany, [name]: value }));
  };

  const handleCheckboxChange = (companyId) => {
    setCheckedCompanyId(companyId === checkedCompanyId ? null : companyId);
  };

  const handleShowRemoveModal = () => {
    if (checkedCompanyId) {
      setShowRemoveModal(true);
    }
  };

  const handleRemoveCompany = () => {
    const updatedCompanies = companies.filter(company => company.id !== checkedCompanyId);
    setCompanies(updatedCompanies);
    localStorage.setItem('companies', JSON.stringify(updatedCompanies));
    setShowRemoveModal(false);
    setCheckedCompanyId(null);
  };

  const handleShowEditModal = () => {
    if (checkedCompanyId) {
      const companyToEdit = companies.find(company => company.id === checkedCompanyId);
      setNewCompany(companyToEdit);
      setShowEditModal(true);
    }
  };

  const handleEditCompany = () => {
    const validationErrors = {};
    if (!newCompany.name) validationErrors.name = 'Organisation Name is required';
    if (!newCompany.number) validationErrors.number = 'Organisation Number is required';
    if (!newCompany.city) validationErrors.city = 'City is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const updatedCompanies = companies.map(company =>
        company.id === checkedCompanyId ? newCompany : company
      );
      setCompanies(updatedCompanies);
      localStorage.setItem('companies', JSON.stringify(updatedCompanies));
      setShowEditModal(false);
      setNewCompany({ name: '', number: '', city: '' });
      setErrors({});
      setCheckedCompanyId(null);
    }
  };

  return (
    <div className="container">
      <Tabs defaultActiveKey="add" id="companies-tabs" className="mb-3">
        <Tab eventKey="add" title="Add New">
          <div className="add-company-form">
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
            {successMessage && <div className="success">{successMessage}</div>}
            <Modal show={showAddModal} onHide={handleCloseAddModal}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Add</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to add this company?</Modal.Body>
              <Modal.Footer className="d-flex justify-content-center">
                <Button variant="secondary" onClick={handleCloseAddModal} className="btn-sm-popup">
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleAddCompany} className="btn-sm-popup">
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
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
                <input
                  type="checkbox"
                  checked={company.id === checkedCompanyId}
                  onChange={() => handleCheckboxChange(company.id)}
                />
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <div>{company.name}</div>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-center mt-3">
            <Button
              variant="danger"
              className="btn-sm-custom"
              onClick={handleShowRemoveModal}
              disabled={!checkedCompanyId}
            >
              Remove
            </Button>
            <Button
              variant="secondary"
              className="btn-sm-custom"
              onClick={handleShowEditModal}
              disabled={!checkedCompanyId}
            >
              Edit
            </Button>
          </div>
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
          <Modal show={showRemoveModal} onHide={() => setShowRemoveModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Remove</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to remove this company?</Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <Button variant="secondary" onClick={() => setShowRemoveModal(false)} className="btn-sm-popup">
                Cancel
              </Button>
              <Button variant="danger" onClick={handleRemoveCompany} className="btn-sm-popup">
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Company</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <label htmlFor="editName">Organisation Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="editName"
                  name="name"
                  value={newCompany.name}
                  onChange={handleInputChange}
                />
                {errors.name && <div className="error">{errors.name}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="editNumber">Organisation Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="editNumber"
                  name="number"
                  value={newCompany.number}
                  onChange={handleInputChange}
                />
                {errors.number && <div className="error">{errors.number}</div>}
              </div>
              <div className="form-group">
                <select
                  className="form-control"
                  id="editCity"
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
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <Button variant="secondary" onClick={() => setShowEditModal(false)} className="btn-sm-popup">
                Cancel
              </Button>
              <Button variant="primary" onClick={handleEditCompany} className="btn-sm-popup">
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Companies;
























