import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tabs, Tab, Button, Modal } from "react-bootstrap";
import cities from "../Utils/Cities";
import organisationList from "../Utils/OrganisationList";
import "../CSS/AdminPage.css";

const Organisations = () => {
  const [organisations, setOrganisations] = useState([]);
  const [selectedOrganisations, setSelectedOrganisations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const organisationsPerPage = 10;
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newOrganisation, setNewOrganisation] = useState({
    name: "",
    number: "",
    adminEmail: "",
    city: "",
  });
  const [errors, setErrors] = useState({});
  const [selectedOrganisation, setSelectedOrganisation] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const storedOrganisations =
      JSON.parse(localStorage.getItem("organisations")) || [];
    setOrganisations(storedOrganisations);
  }, []);

  const indexOfLastOrganisation = currentPage * organisationsPerPage;
  const indexOfFirstOrganisation =
    indexOfLastOrganisation - organisationsPerPage;
  const currentOrganisations = organisations.slice(
    indexOfFirstOrganisation,
    indexOfLastOrganisation
  );

  const handleNextPage = () => {
    const nextPageOrganisations = organisations.slice(
      indexOfLastOrganisation,
      indexOfLastOrganisation + organisationsPerPage
    );
    if (nextPageOrganisations.length === 0) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSort = (field) => {
    let direction = "asc";
    if (sortConfig.key === field && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedOrganisations = [...organisations].sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];

      if (aValue < bValue) {
        return direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setOrganisations(sortedOrganisations);
    setSortConfig({ key: field, direction });
  };

  const getSortIcon = (field) => {
    if (sortConfig.key !== field) {
      return "▼";
    }
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  const validateOrganisation = (
    organisation,
    existingOrganisations,
    ignoreId = null
  ) => {
    const validationErrors = {};
    if (!organisation.name)
      validationErrors.name = "Organisation Name is required";
    if (!organisation.number)
      validationErrors.number = "Organisation Number is required";
    if (!organisation.adminEmail)
      validationErrors.adminEmail = "Admin Email is required";
    if (!organisation.city) validationErrors.city = "City is required";

    const isDuplicate = existingOrganisations.some(
      (existingOrganisation) =>
        existingOrganisation.id !== ignoreId &&
        existingOrganisation.name === organisation.name &&
        existingOrganisation.number === organisation.number &&
        existingOrganisation.adminEmail === organisation.adminEmail
    );

    if (isDuplicate) {
      validationErrors.name =
        "Organisation with the same name, number, and admin email already exists";
    }

    return validationErrors;
  };

  const handleAddOrganisation = () => {
    const validationErrors = validateOrganisation(
      newOrganisation,
      organisations
    );
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const updatedOrganisations = [
        ...organisations,
        { ...newOrganisation, id: organisations.length + 1 },
      ];
      setOrganisations(updatedOrganisations);
      localStorage.setItem(
        "organisations",
        JSON.stringify(updatedOrganisations)
      );
      setShowAddModal(false);
      setNewOrganisation({ name: "", number: "", adminEmail: "", city: "" });
      setErrors({});
      setSuccessMessage("Organisation added successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => setShowAddModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrganisation((prevOrganisation) => ({
      ...prevOrganisation,
      [name]: value,
    }));
  };

  const handleRemoveOrganisation = () => {
    const updatedOrganisations = organisations.filter(
      (organisation) => !selectedOrganisations.includes(organisation.id)
    );
    setOrganisations(updatedOrganisations);
    localStorage.setItem("organisations", JSON.stringify(updatedOrganisations));
    setShowRemoveModal(false);
  };

  const handleEditOrganisation = () => {
    const validationErrors = validateOrganisation(
      newOrganisation,
      organisations,
      selectedOrganisation
    );
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const updatedOrganisations = organisations.map((organisation) =>
        organisation.id === selectedOrganisation
          ? { ...organisation, ...newOrganisation }
          : organisation
      );
      setOrganisations(updatedOrganisations);
      localStorage.setItem(
        "organisations",
        JSON.stringify(updatedOrganisations)
      );
      setShowEditModal(false);
      setNewOrganisation({ name: "", number: "", adminEmail: "", city: "" });
      setErrors({});
      setSuccessMessage("Organisation updated successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleShowRemoveModal = () => {
    setShowRemoveModal(true);
  };

  const handleShowEditModal = (organisation) => {
    setSelectedOrganisation(organisation.id);
    setNewOrganisation({
      name: organisation.name,
      number: organisation.number,
      adminEmail: organisation.adminEmail,
      city: organisation.city,
    });
    setShowEditModal(true);
  };

  const handleCheckboxChange = (organisationId) => {
    setSelectedOrganisations((prevSelected) =>
      prevSelected.includes(organisationId)
        ? prevSelected.filter((id) => id !== organisationId)
        : [...prevSelected, organisationId]
    );
  };

  return (
    <div className="container">
      <Tabs defaultActiveKey="view" id="organisations-tabs" className="mb-3">
        <Tab eventKey="add" title="Add New">
          <div className="form-group half-width">
            <label htmlFor="name" className="bold-label">
              Organisation Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={newOrganisation.name}
              onChange={handleInputChange}
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
          <div className="form-group half-width">
            <label htmlFor="number" className="bold-label">
              Organisation Number
            </label>
            <input
              type="text"
              className="form-control"
              id="number"
              name="number"
              value={newOrganisation.number}
              onChange={handleInputChange}
            />
            {errors.number && <div className="error">{errors.number}</div>}
          </div>
          <div className="form-group half-width">
            <label htmlFor="adminEmail" className="bold-label">
              Admin Email
            </label>
            <input
              type="email"
              className="form-control"
              id="adminEmail"
              name="adminEmail"
              value={newOrganisation.adminEmail}
              onChange={handleInputChange}
            />
            {errors.adminEmail && (
              <div className="error">{errors.adminEmail}</div>
            )}
          </div>
          <div className="form-group half-width">
            <label htmlFor="city" className="bold-label">
              City
            </label>
            <select
              className="form-control"
              id="city"
              name="city"
              value={newOrganisation.city}
              onChange={handleInputChange}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
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
              Add New Organisation
            </Button>
          </div>
          {successMessage && <div className="success">{successMessage}</div>}
          <Modal show={showAddModal} onHide={handleCloseAddModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Add</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to add this organisation?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleCloseAddModal}
                className="btn-sm-popup"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleAddOrganisation}
                className="btn-sm-popup"
              >
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </Tab>
        <Tab eventKey="view" title="View All">
          <div className="row border p-3 text-center">
            <div className="col-1 select-column">
              <strong>Select</strong>
            </div>
            <div
              className="col-2"
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => handleSort("name")}
            >
              <strong>Name</strong>
              <span style={{ marginLeft: "5px" }}>{getSortIcon("name")}</span>
            </div>
            <div
              className="col-2"
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => handleSort("number")}
            >
              <strong>Organisation Number</strong>
              <span style={{ marginLeft: "5px" }}>{getSortIcon("number")}</span>
            </div>
            <div
              className="col-2"
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => handleSort("city")}
            >
              <strong>City</strong>
              <span style={{ marginLeft: "5px" }}>{getSortIcon("city")}</span>
            </div>
            <div
              className="col-2"
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => handleSort("adminEmail")}
            >
              <strong>Admin Email</strong>
              <span style={{ marginLeft: "5px" }}>
                {getSortIcon("adminEmail")}
              </span>
            </div>
          </div>
          {currentOrganisations.map((organisation, index) => (
            <div
              key={index}
              className="row border-top p-3 text-center align-items-center user-row"
              style={{ transition: "background-color 0.3s", cursor: "pointer" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "white")
              }
              onClick={() => handleShowEditModal(organisation)}
            >
              <div
                className="col-1 select-column"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="checkbox"
                  onChange={(e) => {
                    e.stopPropagation();
                    handleCheckboxChange(organisation.id);
                  }}
                  checked={selectedOrganisations.includes(organisation.id)}
                />
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <div>{organisation.name}</div>
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <div>{organisation.number}</div>
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <div>{organisation.city}</div>
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <div>{organisation.adminEmail}</div>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-between mt-3">
            <div>
              <Button
                variant="primary"
                className="pagination-btn"
                onClick={handlePreviousPage}
                style={{ display: currentPage === 1 ? "none" : "inline-block" }}
                disabled={currentPage === 1}
              >
                Previous Page
              </Button>
            </div>
            <div className="ml-auto">
              {indexOfLastOrganisation < organisations.length && (
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
              onClick={handleShowRemoveModal}
              disabled={selectedOrganisations.length === 0}
            >
              Remove
            </Button>
          </div>
          <Modal
            show={showRemoveModal}
            onHide={() => setShowRemoveModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Remove</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to remove the selected organisations?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowRemoveModal(false)}
                className="btn-sm-popup"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleRemoveOrganisation}
                className="btn-sm-popup"
              >
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title className="centered-modal-title">
                Edit Organisation
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group half-width">
                <label htmlFor="edit-name" className="bold-label">
                  Organisation Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={newOrganisation.name}
                  onChange={handleInputChange}
                />
                {errors.name && <div className="error">{errors.name}</div>}
              </div>
              <div className="form-group half-width">
                <label htmlFor="edit-number" className="bold-label">
                  Organisation Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="edit-number"
                  name="number"
                  value={newOrganisation.number}
                  onChange={handleInputChange}
                />
                {errors.number && <div className="error">{errors.number}</div>}
              </div>
              <div className="form-group half-width">
                <label htmlFor="edit-adminEmail" className="bold-label">
                  Admin Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="edit-adminEmail"
                  name="adminEmail"
                  value={newOrganisation.adminEmail}
                  onChange={handleInputChange}
                />
                {errors.adminEmail && (
                  <div className="error">{errors.adminEmail}</div>
                )}
              </div>
              <div className="form-group half-width">
                <label htmlFor="edit-city" className="bold-label">
                  City
                </label>
                <select
                  className="form-control"
                  id="edit-city"
                  name="city"
                  value={newOrganisation.city}
                  onChange={handleInputChange}
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {errors.city && <div className="error">{errors.city}</div>}
              </div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <Button
                variant="secondary"
                onClick={() => setShowEditModal(false)}
                className="btn-sm-popup"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleEditOrganisation}
                className="btn-sm-popup wide-button"
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Organisations;
