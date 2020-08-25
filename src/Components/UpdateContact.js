import React, { useState } from 'react';
import styled from 'styled-components';
import UpdateProfile from '../Services/UpdateProfile';
import { connect } from 'react-redux';

const DivFormulario = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  margin-top: 1em;
  padding-bottom: 2em;
  .col.py-3 {
    width: 300px;
    margin: auto;
  }
  div[class='col py-3 check'] {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    label {
      margin: 0;
      margin-left: 1em;
      text-align: left;
      font-weight: 400;
      small {
        font-weight: 300;
        line-height: 0.4em;
      }
    }
  }
  .containerButtons {
    display: flex;
    justify-content: space-between;
    width: 270px;
    margin: auto;
  }
`;

const DivMsgUpdate = styled.div`
  text-align: center;
`;

function UpdateContact({ setUpdateProfile, seleccion, user, setuser }) {
  const [datos, setDatos] = useState({
    name: '',
    lastName: '',
    email: '',
  });
  const [profileUpdate, setProfileUpdate] = useState(false);

  const handleInputChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    if (seleccion === undefined) {
      var id = window.location.pathname.split('/').pop();
    } else {
      id = seleccion;
    }
    e.preventDefault();
    const changesUpdates = document.querySelector('input[type=checkbox]')
      .checked;
    UpdateProfile(datos.name, datos.lastName, datos.email).then((json) => {
      const first_name = json.first_name;
      const last_name = json.last_name;
      const email = json.email;
      if (datos.email !== '') {
        var newObject = { first_name, last_name, email };
      } else {
        newObject = { first_name, last_name };
      }
      const returnedTarget = Object.assign(user, newObject);
      setuser(returnedTarget);
      if (changesUpdates)
        localStorage.setItem(id, JSON.stringify(returnedTarget));
      setProfileUpdate(true);

      setTimeout(() => {
        setUpdateProfile(false);
      }, 1000);
    });
  };

  return (
    <DivFormulario data-aos="fade-up" data-aos-anchor-placement="top-bottom">
      {!profileUpdate ? (
        <form action="#" onSubmit={handleSubmit} className="form container-md">
          <div className="form-col container">
            <div className="col py-3">
              <input
                type="text"
                className="form-control name"
                placeholder="First Name"
                required
                name="name"
                onChange={handleInputChange}
              />
            </div>
            <div className="col py-3">
              <input
                type="text"
                className="form-control last-name"
                placeholder="Last Name"
                required
                name="lastName"
                onChange={handleInputChange}
              />
            </div>
            <div className="col py-3">
              <input
                type="text"
                className="form-control email"
                placeholder="correo@correo.com"
                name="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="col py-3 check">
              <input type="checkbox" id="ls" />
              <label htmlFor="ls">
                Keep changes
                <br />
                <small>The changes will be saved in LocalStorage</small>
              </label>
            </div>
            <div className="containerButtons">
              <button
                type="button"
                onClick={() => setUpdateProfile(false)}
                className="btn btn-warning"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      ) : (
        <DivMsgUpdate data-aos="fade-up">Profile Update</DivMsgUpdate>
      )}
    </DivFormulario>
  );
}

const mapStateToProps = (state) => ({
  users: state.user,
});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(UpdateContact);
