import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import ButtonBack from './ButtonBack';
import styled from 'styled-components';
import GetUser from '../Services/GetUser';
import DeleteUser from '../Services/DeleteUser';
import UpdateContact from './UpdateContact';
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
  .animate-bottom {
    display: none;
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

  .container-btns {
    display: ${(props) => (props.updateProfile ? 'none' : 'block')};
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
  const [updateProfile, setUpdateProfile] = useState(false);

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
  const handleDelete = (e) => {
    DeleteUser(seleccion).then((data) => console.log('User delete', data));
    document.querySelector('.info-profile').classList.add('delete');
    setTimeout(() => {
      setUserDelete(true);
      setUpdateProfile(false);
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
        <DivUser updateProfile={updateProfile}>
          <div className="container info-profile">
            <h1>
              {user.first_name} {user.last_name}
            </h1>
            <p>{user.email}</p>

            <img
              className="avatar"
              data-aos="zoom-in-up"
              src={user.avatar}
              alt={user.first_name}
            />
          </div>
          <div className="container-btns">
            <button
              type="button"
              onClick={() => setUpdateProfile(true)}
              className="btn btn-info"
            >
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
          <div className="animate-bottom">
            <h2>Profile Updated! </h2>
          </div>
        </DivUser>
      )}
      {updateProfile ? (
        <UpdateContact
          user={user}
          setuser={setuser}
          seleccion={seleccion}
          setUpdateProfile={setUpdateProfile}
        />
      ) : (
        <></>
      )}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  select: state.select,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PerfilUsuario);
