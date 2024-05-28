import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewlyRegisteredUsers = () => {
  const [newUsers, setNewUsers] = useState([
    { name: 'Kurt Kurtson', email: 'kurt@xbus.com', company: 'XBUS', employed: true },
    { name: 'Conny Connysson', email: 'conny@example.com', company: 'EXCEED', employed: false },
    { name: 'Daniel Carlsson', email: 'unix555@gmail.com', company: 'Sprinta', employed: false }
  ]);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [acceptedUsers, setAcceptedUsers] = useState([]);
  const [rejectedUsers, setRejectedUsers] = useState([]);
  const [showAccepted, setShowAccepted] = useState(false);
  const [showRejected, setShowRejected] = useState(false);

  const handleCheckboxChange = (user) => {
    if (checkedUsers.includes(user)) {
      setCheckedUsers(checkedUsers.filter(u => u !== user));
    } else {
      setCheckedUsers([...checkedUsers, user]);
    }
  };

  const handleAccept = () => {
    setAcceptedUsers([...acceptedUsers, ...checkedUsers]);
    setCheckedUsers([]);
    setShowAccepted(true);
  };

  const handleReject = () => {
    setRejectedUsers([...rejectedUsers, ...checkedUsers]);
    setCheckedUsers([]);
    setShowRejected(true);
  };

  const handleCancelAccept = () => {
    setShowAccepted(false);
    setAcceptedUsers([]);
  };

  const handleCancelReject = () => {
    setShowRejected(false);
    setRejectedUsers([]);
  };

  const finalizeAccept = () => {
    setNewUsers(newUsers.filter(user => !acceptedUsers.includes(user)));
    setAcceptedUsers([]);
    setShowAccepted(false);
  };

  const finalizeReject = () => {
    setNewUsers(newUsers.filter(user => !rejectedUsers.includes(user)));
    setRejectedUsers([]);
    setShowRejected(false);
  };

  return (
    <div className="container">
      {/* Header row */}
      <div className="row border p-3">
        <div className="col"><strong>Select</strong></div>
        <div className="col"><strong>Last Name</strong></div>
        <div className="col"><strong>First Name</strong></div>
        <div className="col"><strong>E-mail</strong></div>
        <div className="col"><strong>Company</strong></div>
        <div className="col"><strong>Employed</strong></div>
      </div>
      {/* Users */}
      {newUsers.map((user, index) => (
        <div key={index} className="row border-top p-3">
          <div className="col">
            <input type="checkbox" onChange={() => handleCheckboxChange(user)} checked={checkedUsers.includes(user)} />
          </div>
          <div className="col">{user.name.split(' ')[1]}</div>
          <div className="col">{user.name.split(' ')[0]}</div>
          <div className="col">{user.email}</div>
          <div className="col">{user.company}</div>
          <div className="col">{user.employed ? 'Yes' : 'No'}</div>
        </div>
      ))}
      {/* Accept and Reject buttons */}
      <div className="row mt-3" style={{ maxWidth: '200px', margin: 'auto' }}>
        <div className="col d-flex justify-content-center">
          <button type="button" className="btn btn-primary btn-sm mr-2" style={{ fontSize: '10px', marginRight: '10px' }} onClick={handleAccept}>Accept</button>
          <button type="button" className="btn btn-danger btn-sm" style={{ fontSize: '10px', marginLeft: '10px' }} onClick={handleReject}>Reject</button>
        </div>
      </div>
      {/* Accepted Users */}
      {showAccepted && acceptedUsers.length > 0 && (
        <div className="mt-3">
          <h5>Accepted Users</h5>
          <ul className="list-group">
            {acceptedUsers.map((user, index) => (
              <li key={index} className="list-group-item">
                {user.name} - {user.email}
              </li>
            ))}
          </ul>
          <div className="mt-2 d-flex justify-content-center">
            <button className="btn btn-primary btn-sm mr-2" style={{ width: '80px', fontSize: '10px', marginRight: '10px' }} onClick={finalizeAccept}>Accept</button>
            <button className="btn btn-secondary btn-sm" style={{ width: '80px', fontSize: '10px', marginLeft: '10px' }} onClick={handleCancelAccept}>Cancel</button>
          </div>
        </div>
      )}
      {/* Rejected Users */}
      {showRejected && rejectedUsers.length > 0 && (
        <div className="mt-3">
          <h5>Rejected Users</h5>
          <ul className="list-group">
            {rejectedUsers.map((user, index) => (
              <li key={index} className="list-group-item">
                {user.name} - {user.email}
              </li>
            ))}
          </ul>
          <div className="mt-2 d-flex justify-content-center">
            <button className="btn btn-primary btn-sm mr-2" style={{ width: '80px', fontSize: '10px', marginRight: '10px' }} onClick={finalizeReject}>Accept</button>
            <button className="btn btn-secondary btn-sm" style={{ width: '80px', fontSize: '10px', marginLeft: '10px' }} onClick={handleCancelReject}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewlyRegisteredUsers;


























