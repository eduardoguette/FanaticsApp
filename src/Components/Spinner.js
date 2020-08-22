import React from 'react';
import spinner from '../loading.gif';
import styled from 'styled-components';
const DivSpinner = styled.div`
  height: 100vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  img {
    height: 80px;
  }
`;
export default function Spinner() {
  return (
    <DivSpinner>
      <div className="spinner" id="spinner">
        <img className="img-spinner" src={spinner} alt="spinner" />
      </div>
    </DivSpinner>
  );
}
