// src/Components/AgreementModal.js
import React from 'react';
import Modal from 'react-modal';
import '../CSS/Agreement.css'; 

const AgreementModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Agreement Policy"
      className="Modal"
      overlayClassName="Overlay"
    >
      <h2>Agreement Policy</h2>
      <p>Here goes the agreement policy content...</p>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default AgreementModal;
