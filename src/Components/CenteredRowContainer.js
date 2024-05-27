import React from 'react';
import styled from 'styled-components';

const CenteredRowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #ccc; /* add a border */
  padding: 10px; /* add some padding to make the border visible */
`;

function CenteredRow({ children }) {
  return <CenteredRowContainer>{children}</CenteredRowContainer>;
}

export default CenteredRow;