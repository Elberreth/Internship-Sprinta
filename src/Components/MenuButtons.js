import React from 'react';
import styled from 'styled-components';

const RadioInput = styled.input`
  margin-right: 8px;
`;

const RadioLabel = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;

const ViewMoreButton = styled.button`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 16px;
  line-height: 1.5;
  text-align: left;
  user-select: none;
  vertical-align: middle;
`;

const MenuButtons = ({ onAccept, onReject }) => {
  return (
    <>
      <RadioLabel>
        <RadioInput type="radio" value="accept" />
        Accept
      </RadioLabel>
      <ViewMoreButton>
        View More
      </ViewMoreButton>
      <RadioLabel>
        <RadioInput type="radio" value="reject" />
        Reject
      </RadioLabel>
      <ViewMoreButton>
        View More
      </ViewMoreButton>
    </>
  );
};

export default MenuButtons;