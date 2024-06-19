import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab, Button, Modal } from 'react-bootstrap';
import cities from '../Utils/Cities';
import '../CSS/AdminPage.css'; 

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 10;
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newCompany, setNewCompany] = useState({ name: '', number: '', adminEmail: '', city: '' });
  const [errors, setErrors] = useState({});
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

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
    if (!newCompany.adminEmail) validationErrors.adminEmail = 'Admin Email is required';
    if (!newCompany.city) validationErrors.city = 'City is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const updatedCompanies = [...companies, { ...newCompany, id: companies.length + 1 }];
      setCompanies(updatedCompanies);
      localStorage.setItem('companies', JSON.stringify(updatedCompanies));
      setShowAddModal(false);
      setNewCompany({ name: '', number: '', adminEmail: '', city: '' });
      setErrors({});
      setSuccessMessage('Company added successfully');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
    }
  };

  const handleShowAddModal = () => {
    const validationErrors = {};
    if (!newCompany.name) validationErrors.name = 'Organisation Name is required';
    if (!newCompany.number) validationErrors.number = 'Organisation Number is required';
    if (!newCompany.adminEmail) validationErrors.adminEmail = 'Admin Email is required';
    if (!newCompany.city) validationErrors.city = 'City is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setShowAddModal(true);
    }
  };

  const handleCloseAddModal = () => setShowAddModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompany((prevCompany) => ({ ...prevCompany, [name]: value }));
  };

  const handleRemoveCompany = () => {
    const updatedCompanies = companies.filter(company => company.id !== selectedCompany);
    setCompanies(updatedCompanies);
    localStorage.setItem('companies', JSON.stringify(updatedCompanies));
    setShowRemoveModal(false);
  };

  const handleEditCompany = () => {
    const updatedCompanies = companies.map(company =>
      company.id === selectedCompany ? { ...company, ...newCompany } : company
    );
    setCompanies(updatedCompanies);
    localStorage.setItem('companies', JSON.stringify(updatedCompanies));
    setShowEditModal(false);
    setNewCompany({ name: '', number: '', adminEmail: '', city: '' });
  };

  const handleShowRemoveModal = (companyId) => {
    setSelectedCompany(companyId);
    setShowRemoveModal(true);
  };

  const handleShowEditModal = (company) => {
    setSelectedCompany(company.id);
    setNewCompany({ name: company.name, number: company.number, adminEmail: company.adminEmail, city: company.city });
    setShowEditModal(true);
  };

  return (
    <div className="container">
      <Tabs defaultActiveKey="add" id="companies-tabs" className="mb-3">
        <Tab eventKey="add" title="Add New">
          <div className="form-group half-width">
            <label htmlFor="name" className="bold-label">Organisation Name</label>
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
          <div className="form-group half-width">
            <label htmlFor="number" className="bold-label">Organisation Number</label>
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
          <div className="form-group half-width">
            <label htmlFor="adminEmail" className="bold-label">Admin Email</label>
            <input
              type="email"
              className="form-control"
              id="adminEmail"
              name="adminEmail"
              value={newCompany.adminEmail}
              onChange={handleInputChange}
            />
            {errors.adminEmail && <div className="error">{errors.adminEmail}</div>}
          </div>
          <div className="form-group half-width">
            <label htmlFor="city" className="bold-label">City</label>
            <select
              className="form-control"
              id="city"
              name="city"
              value={newCompany.city}
              onChange={handleInputChange}
            >
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {errors.city && <div className="error">{errors.city}</div>}
          </div>
          <div className="d-flex justify-content-center">
            <Button
              variant="primary"
              className="common-btn wide-button"
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
              onClick={() => handleSort('number')}
            >
              <strong>Organisation Number</strong>
              <span style={{ marginLeft: '5px' }}>{getSortIcon('number')}</span>
            </div>
            <div
              className="col-2"
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              onClick={() => handleSort('adminEmail')}
            >
              <strong>Admin Email</strong>
              <span style={{ marginLeft: '5px' }}>{getSortIcon('adminEmail')}</span>
            </div>
            <div
              className="col-2"
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              onClick={() => handleSort('city')}
            >
              <strong>City</strong>
              <span style={{ marginLeft: '5px' }}>{getSortIcon('city')}</span>
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
                  onChange={() => setSelectedCompany(company.id)}
                  checked={selectedCompany === company.id}
                />
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <div>{company.name}</div>
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <div>{company.number}</div>
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <div>{company.adminEmail}</div>
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <div>{company.city}</div>
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
          <div className="d-flex justify-content-center mt-3">
            <Button
              variant="danger"
              className="btn-sm-custom common-btn"
              onClick={() => handleShowRemoveModal(selectedCompany)}
              disabled={!selectedCompany}
            >
              Remove
            </Button>
            <Button
              variant="primary"
              className="btn-sm-custom common-btn"
              onClick={() => handleShowEditModal(currentCompanies.find(company => company.id === selectedCompany))}
              disabled={!selectedCompany}
            >
              Edit
            </Button>
          </div>
          <Modal show={showRemoveModal} onHide={() => setShowRemoveModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Remove</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to remove this company?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowRemoveModal(false)} className="btn-sm-popup">
                Cancel
              </Button>
              <Button variant="primary" onClick={handleRemoveCompany} className="btn-sm-popup">
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title className="centered-modal-title">Edit Company</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group half-width">
                <label htmlFor="edit-name" className="bold-label">Organisation Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="edit-name"
                  name="name"
                  value={newCompany.name}
                  onChange={handleInputChange}
                />
                {errors.name && <div className="error">{errors.name}</div>}
              </div>
              <div className="form-group half-width">
                <label htmlFor="edit-number" className="bold-label">Organisation Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="edit-number"
                  name="number"
                  value={newCompany.number}
                  onChange={handleInputChange}
                />
                {errors.number && <div className="error">{errors.number}</div>}
              </div>
              <div className="form-group half-width">
                <label htmlFor="edit-adminEmail" className="bold-label">Admin Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="edit-adminEmail"
                  name="adminEmail"
                  value={newCompany.adminEmail}
                  onChange={handleInputChange}
                />
                {errors.adminEmail && <div className="error">{errors.adminEmail}</div>}
              </div>
              <div className="form-group half-width">
                <label htmlFor="edit-city" className="bold-label">City</label>
                <select
                  className="form-control"
                  id="edit-city"
                  name="city"
                  value={newCompany.city}
                  onChange={handleInputChange}
                >
                  <option value="">Select City</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {errors.city && <div className="error">{errors.city}</div>}
              </div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <Button variant="secondary" onClick={() => setShowEditModal(false)} className="btn-sm-popup">
                Cancel
              </Button>
              <Button variant="primary" onClick={handleEditCompany} className="btn-sm-popup wide-button">
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





































