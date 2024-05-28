import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewlyRegisteredUsers = () => {
  const [acceptedUsers, setAcceptedUsers] = useState([]);
  const [rejectedUsers, setRejectedUsers] = useState([]);
  const [checkedUsers, setCheckedUsers] = useState([]);

  const handleAccept = (user) => {
    setAcceptedUsers([...acceptedUsers, user]);
    setCheckedUsers(checkedUsers.filter(checkedUser => checkedUser.email !== user.email));
  };

  const handleReject = (user) => {
    setRejectedUsers([...rejectedUsers, user]);
    setCheckedUsers(checkedUsers.filter(checkedUser => checkedUser.email !== user.email));
  };

  const handleCheckboxChange = (user) => {
    if (checkedUsers.find(checkedUser => checkedUser.email === user.email)) {
      setCheckedUsers(checkedUsers.filter(checkedUser => checkedUser.email !== user.email));
    } else {
      setCheckedUsers([...checkedUsers, user]);
    }
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
      {[
        { name: 'John Doe', email: 'john.doe@example.com', company: 'ABC Company', employed: true },
        { name: 'Jane Doe', email: 'jane.doe@example.com', company: 'XYZ Corporation', employed: false },
        // Add more users here
      ].map((user, index) => (
        <div key={index} className="row border-top p-3">
          <div className="col">
            <input type="checkbox" onChange={() => handleCheckboxChange(user)} />
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
          <button type="button" className="btn btn-success btn-sm mr-2" onClick={() => handleAccept({ name: 'John Doe', email: 'john.doe@example.com', company: 'ABC Company', employed: true })}>Accept</button>
          <button type="button" className="btn btn-danger btn-sm" onClick={() => handleReject({ name: 'Jane Doe', email: 'jane.doe@example.com', company: 'XYZ Corporation', employed: false })}>Reject</button>
        </div>
      </div>
    </div>
  );
};

export default NewlyRegisteredUsers;
