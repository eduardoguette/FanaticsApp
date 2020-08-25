import React, { useState } from 'react';
import styled from 'styled-components';
import Log from '../Services/Log';
import ErrorAutentication from './ErrorAutentication';
const DivFormulario = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  color: white;
  padding: 2em;
  background-color: #160b29;
  height: 340px;
  &:hover {
    box-shadow: 0px 0px 20px #413557a4;
  }
  h2 {
    margin-bottom: 1em;
    font-weight: 700;
  }
  .form-check {
    display: flex;
    align-items: center;
    margin-top: -1em;
    margin-bottom: 1em;
    input {
      margin-top: 0;
      margin-bottom: 0;
    }
    label {
      margin: 0;
      font-size: 0.8em;
      font-weight: 300;
    }
  }
  .form-group {
    display: flex;
    flex-direction: column;
    margin-top: -1em;
    input {
      margin: 0.6em 0;
      height: 2.5em;
      width: 250px;
      outline-color: rgb(252, 234, 74);
      border: none;
      order: 2;
      transition: 0.4s ease;
      &:focus ~ label {
        font-size: 0.9em;
        color: #ff6464;
        position: relative;
        top: 0.7em;
        transition: 0.4s ease;
      }
    }
    label {
      order: 1;
      transition: 0.4s ease;
      font-size: 0.8em;
      position: relative;
      top: 0.5em;
    }
  }
`;

function FormularioLog() {
  const [errorAutent, seterrorAutent] = useState(false);
  const [datos, setDatos] = useState({
    email: '',
    password: '',
  });
  const handleInputChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('email', datos.email);
    Log(datos.email, datos.password).then((data) => {
      if (data.token) {
        const token = data.token;
        localStorage.setItem('login', token);
        setTimeout(() => {
          window.location.href = '/home';
        }, 500);
      } else {
        seterrorAutent(true);
        setTimeout(() => {
          seterrorAutent(false);
        }, 2000);
      }
    });
  };

  return (
    <DivFormulario>
      <div className="login-box">
        <h2>Login</h2>
        <form action="#" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="eve.holt@reqres.in"
              name="email"
              onChange={handleInputChange}
              required
            />
            <label>Username</label>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              required
              name="password"
              onChange={handleInputChange}
            />
            <label>Password</label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          {errorAutent ? <ErrorAutentication /> : <></>}
        </form>
      </div>
    </DivFormulario>
  );
}

export default FormularioLog;
