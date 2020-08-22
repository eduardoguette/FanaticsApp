import React, { useState, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Paginacion from './Paginacion';
import ListDeUsuarios from './ListDeUsuarios';
import Navbar from './Navbar';
import NoResults from './NoResults';
import Spinner from './Spinner';

const DivListUser = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .list-users {
    height: 100%;
    margin: 1em auto;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .media {
      margin: 1em;
      background-color: #000f25;
      border-radius: 8px;
      padding: 1em;
      .media-body {
        margin: auto;
        strong {
          color: #fdbf50;
          font-size: 0.9em;
          font-weight: 700;
        }
        a {
          text-decoration: none;
          font-size: 1.3em;
          font-weight: 500;
          color: white;
        }
        a:hover {
          color: #ff6464;
        }
      }
    }
    .media:hover {
      box-shadow: 0 1px 10px #929292;
    }
    img {
      height: 70px;
      border-radius: 100%;
    }

    .no-result {
      font-size: 1em;
      font-weight: 500;
      color: white;
      text-align: center;
    }
  }
`;

function Home({ users }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    users.then((data) => {
      var LS = localStorage;
      // Consultamos el localStorage ya que aqui se almacena el token cuando iniciamos sesion
      if (localStorage.getItem('login')) {
        setTimeout(() => {
          if (localStorage.length > 1) {
            // Comprobamos si existe el token en el localstorage
            const arrayLocalStorage = [];
            const newObject = data;
            for (var i in LS) {
              if (typeof LS[i] === 'function') continue;
              if (typeof LS[i] === 'number') continue;
              if (LS[i].includes('avatar'))
                arrayLocalStorage.push(JSON.parse(LS[i]));
            }
            if (arrayLocalStorage.length > 0) {
              let editUsers = [...arrayLocalStorage, newObject].flat();
              // Filtrar duplicados
              const hash = {};
              editUsers = editUsers.filter((o) =>
                hash[o.id] ? false : (hash[o.id] = true)
              );
              // Ordenamos la lista de usuarios por id
              var ordenArray = editUsers.sort((a, b) => a.id - b.id);
              if (data[0] || data[5]) {
                var max = data[5].id;
                var min = data[0].id;
                var usuarios = ordenArray.filter(
                  ({ id }) => id <= max && id >= min
                );
                setData(usuarios);
              } else {
                setData([]);
              }
            } else {
              setData(data);
            }
          } else {
            setData(data);
          }
          setLoading(false);
        }, 400);
      } else {
        window.location.href = '/';
      }
    });
  }, [users]);
  return (
    <Fragment>
      {localStorage.getItem('login') ? (
        <Fragment>
          <Navbar />
          <DivListUser>
            {loading ? (
              <Spinner />
            ) : data ? (
              data.map(({ first_name, id, avatar, last_name }) => (
                <ListDeUsuarios
                  first_name={first_name}
                  last_name={last_name}
                  key={id}
                  avatar={avatar}
                  id={id}
                />
              ))
            ) : (
              <NoResults />
            )}
          </DivListUser>
          <Paginacion users={users} loading={loading} />
        </Fragment>
      ) : (
        <NoResults />
      )}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  users: state.user,
});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
