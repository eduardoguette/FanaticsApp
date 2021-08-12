import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DivListUser = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .list-users {
    height: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 !important;
    margin: auto !important;
    .media {
      background-color: #000f25;
      border-radius: 8px;
      margin: 0 !important;
      margin: 0.7em !important;
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
      object-fit: cover;
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
function ListDeUsuarios({ usuario_select, avatar, id, first_name, last_name }) {
  return (
    <DivListUser>
      <div className="container-sm list-users">
        <div className="media" id={id}>
          <img src={avatar} className="mr-3" alt={first_name} height="70" width="70" />
          <div className="media-body">
            <strong>Name: </strong>
            <Link to={`/user/${id}`} onClick={() => usuario_select({ id })}>
              <br />
              {first_name} {last_name}
            </Link>
          </div>
        </div>
      </div>
    </DivListUser>
  );
}
const mapStateToProps = (state) => ({
  users: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  pagina(count = 1) {
    dispatch({
      type: 'NEXT_PAGE',
      count,
    });
  },
  usuario_select(id) {
    dispatch({
      type: 'USER_SELECT',
      id,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListDeUsuarios);
