import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RegistrationDetails = () => {
  const { registrationId } = useParams();
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    fetchRegistrationDetails(registrationId).then(data => setRegistration(data));
  }, [registrationId]);

  if (!registration) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Registration Details</h1>
      <p>Email: {registration.email}</p>
      <p>Other details: {registration.otherDetails}</p>
      
    </div>
  );
};

function fetchRegistrationDetails(registrationId) {
  return fetch(`/api/registrations/${registrationId}`)
    .then(response => response.json());
}

export default RegistrationDetails;