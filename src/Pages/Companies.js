import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';  // Lägg till denna import
import './../CSS/AdminPage.css';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 10;
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

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
    </div>
  );
};

export default Companies;


