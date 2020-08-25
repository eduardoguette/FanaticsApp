import React from 'react';
import styled from 'styled-components';
const DivError = styled.div`
  font-weight: 600;
  text-align: center;
  width: 250px;
  font-size: 0.7em;
  color: red;
  padding: 1em 0;
`;
function ErrorAutentication() {
  return (
    <DivError data-aos="zoom-out-left">
      <p>Usuario no registrado.</p>
    </DivError>
  );
}

export default ErrorAutentication;
