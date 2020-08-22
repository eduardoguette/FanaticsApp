import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import ButtonBack from './ButtonBack';
import styled from 'styled-components';
import GetUser from '../Services/GetUser';
import DeleteUser from '../Services/DeleteUser';
import UpdateProfile from '../Services/UpdateProfile';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
const DivMsg = styled.div`
  p {
    text-align: center;
    margin: auto;
    color: white;
  }
`;

const DivUser = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  text-align: center;
  button {
    margin: 2em;
  }

  .spinner-grow,
  .done,
  .form,
  #myDiv {
    display: none;
  }
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
  img.avatar {
    border-radius: 100%;
    border: 3px solid white;
    padding: 0.5em;
  }
  img.avatar:hover {
    cursor: pointer;
    border: 3px solid linear-gradient(red, blue);
  }
  .animate-bottom {
    position: relative;
    -webkit-animation-name: animatebottom;
    -webkit-animation-duration: 1s;
    animation-name: animatebottom;
    animation-duration: 1s;
    h2 {
      font-size: 1em;
    }
  }
  .delete {
    position: relative;
    animation: fade 0.7s ease;
  }
  @keyframes fade {
    from {
      opacity: 100;
    }
    to {
      opacity: 0;
      display: none;
    }
  }
  @-webkit-keyframes animatebottom {
    from {
      bottom: -100px;
      opacity: 0;
    }
    to {
      bottom: 0px;
      opacity: 1;
    }
  }

  @keyframes animatebottom {
    from {
      bottom: -100px;
      opacity: 0;
    }
    to {
      bottom: 0;
      opacity: 1;
    }
  }
`;

function PerfilUsuario({ select }) {
  const [user, setuser] = useState([]);
  const [userDelete, setUserDelete] = useState(false);
  const [userUpdate, setuserUpdate] = useState(false);

  const seleccion = select.id;
  const pathUrl = window.location.href.split('/').pop();
  useEffect(() => {
    if (localStorage.getItem(parseInt(pathUrl))) {
      setuser(JSON.parse(localStorage.getItem(pathUrl)));
    } else if (seleccion === undefined) {
      GetUser(pathUrl).then((data) => setuser(data.data));
    } else {
      GetUser(seleccion).then((data) => setuser(data.data));
    }
  }, [pathUrl, seleccion]);
  const hadleform = () => {
    document.querySelector('.form').style.display = 'block';
    document.querySelector('.container-btns').style.display = 'none';
    document.querySelector('#myDiv').style.display = 'none';
  };
  const handleCancel = () => {
    document.querySelector('.form').style.display = 'none';
    document.querySelector('.container-btns').style.display = 'block';
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = document.querySelector('.name').value;
    const lastName = document.querySelector('.last-name').value;
    var changesUpdates = document.querySelector('input[type=checkbox]').checked;
    const email = document.querySelector('.email').value;
    document.querySelector('.form').style.display = 'none';
    document.querySelector('.spinner-grow').style.display = 'block';
    setTimeout(() => {
      document.querySelector('.spinner-grow').style.display = 'none';
      document.querySelector('.container-btns').style.display = 'block';
      document.getElementById('myDiv').style.display = 'block';
      setTimeout(() => {
        if (document.getElementById('myDiv'))
          document.getElementById('myDiv').style.display = 'none';
      }, 10000);
    }, 1000);
    // fetch
    UpdateProfile(name, lastName, email).then((json) => {
      const first_name = json.first_name;
      const last_name = json.last_name;
      if (email !== '') {
        var newObject = { first_name, last_name, email };
      } else {
        newObject = { first_name, last_name };
      }
      const returnedTarget = Object.assign(user, newObject);
      if (!userUpdate) setuserUpdate(true);
      if (changesUpdates) {
        localStorage.setItem(user.id, JSON.stringify(returnedTarget));
        setTimeout(() => {
          setuser(returnedTarget);
          setuserUpdate(false);
        }, 1000);
      } else {
        setTimeout(() => {
          setuser(returnedTarget);
          setuserUpdate(false);
        }, 1000);
      }
    });
  };
  const handleDelete = (e) => {
    e.preventDefault();
    DeleteUser(seleccion).then((data) => console.log('User delete', data));
    document.querySelector('.info-profile').classList.add('delete');
    setTimeout(() => {
      setUserDelete(true);
    }, 500);
  };

  return (
    <Fragment>
      <Navbar />
      <ButtonBack />
      {userDelete ? (
        <DivMsg>
          <p>Usuario Eliminado</p>
        </DivMsg>
      ) : (
        <DivUser data-aos="fade-up" data-aos-duration="1000">
          <div className="container info-profile">
            <h1>
              {user.first_name} {user.last_name}
            </h1>
            <p>{user.email}</p>

            <img className="avatar" src={user.avatar} alt={user.first_name} />
          </div>
          <div className="container-btns">
            <button type="button" onClick={hadleform} className="btn btn-info">
              Update Profile
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="btn btn-danger"
            >
              Delete user
            </button>
          </div>
          <div
            className="container spinner-grow mt-5 text-primary"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
          <div id="myDiv" className="animate-bottom">
            <h2>Profile Updated! </h2>
          </div>
          <form
            action="#"
            onSubmit={handleSubmit}
            className="form container-md"
          >
            <div className="form-col container">
              <div className="col py-3">
                <input
                  type="text"
                  className="form-control name"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="col py-3">
                <input
                  type="text"
                  className="form-control last-name"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div className="col py-3">
                <input
                  type="text"
                  className="form-control email"
                  placeholder="correo@correo.com"
                />
              </div>
              <div className="col py-3 check">
                <input type="checkbox" id="ls" />
                <label htmlFor="ls">
                  Mantener cambios
                  <br />
                  <small>Los cambios se guardaran en LocalStorage</small>
                </label>
              </div>
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-warning"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </DivUser>
      )}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  select: state.selet,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PerfilUsuario);
