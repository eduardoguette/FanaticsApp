import React from 'react';
import styled from 'styled-components';
import logo from '../logo.png';
import perfil from '../perfil.png';
import { Link } from 'react-router-dom';
const DivNavBar = styled.div`
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2em 4em;
    .logo-ppal {
      height: 2.4em;
    }
    .sesion {
      .login {
        height: 1.6em;
        &:hover {
          cursor: pointer;
        }
      }
      .perfil {
        height: 2em;
        border-radius: 100%;
        margin-right: 1em;
      }
    }
  }
`;
const DivProfile = styled.div`
  .list {
    display: none;
  }
  .perfil {
    height: 2.4em !important;
    width: 2.4em !important;
    cursor: pointer;
    padding: 0.2em;
    & ~ .list.active {
      font-weight: 400;
      display: grid;
      color: black;
      text-align: center;
      max-width: 200px; 
      position: absolute;
      top: 7em;
      font-size: 0.8em;
      z-index: 1;
      right: 5.3em;
      background-color: #dee2f8;
      border-radius: 5px;
      &::after {
        content: '';
        z-index: -1;
        position: absolute;
        height: 1em;
        width: 1em;
        bottom: 4.3em;
        right: 2em;
        background-color: #dee2f8;
        transform: rotate(45deg);
      }

      label {
        position: relative;
        z-index: 9;
        cursor: pointer;
        margin: 0;
        padding: 0.5rem .8rem;
        &:hover {
          color: #ff6464;
        }
        &:first-of-type {
          border-bottom: 1px solid #5a5a5a2c;
          text-align: center;
        } 
      }

      .c-email {
        padding-top: 0.5em;
      }
    }
  }
`;

function Navbar() {
  const handleSignOut = () => {
    localStorage.removeItem('login');
    localStorage.removeItem('email');
    setTimeout(() => {
      window.location.href = '/';
    }, 300);
  };
  const handleClick = () => {
    document.querySelector('.list').classList.toggle('active');
  };

  return (
    <DivNavBar>
      <nav className="navbar navbar-light ">
        <Link className="navbar-brand" to="/home">
          <img
            className="logo-ppal"
            src={logo}
            height="70"
            alt="top"
            loading="lazy"
          />
        </Link>
        <div className="sesion">
          <DivProfile className="container-perfil">
            <img
              className="perfil"
              onClick={handleClick}
              src={perfil}
              alt="logo"
            />
            <div className="list">
              <label className="c-email">{localStorage.getItem('email')}</label>
              <label onClick={handleSignOut}>Salir</label>
            </div>
          </DivProfile>
        </div>
      </nav>
    </DivNavBar>
  );
}

export default Navbar;
