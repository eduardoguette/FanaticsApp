import React from 'react';
import logo from '../logo.png';
import styled from 'styled-components';
import FormularioLog from './FormularioLog';

const DivLogo = styled.div`
  img {
    height: 4em;
  }
`;

function Login() {
  return (
    <div className="container log">
      <DivLogo>
        <img src={logo} alt="logo" />
      </DivLogo>
      <FormularioLog />
    </div>
  );
}

export default Login;
