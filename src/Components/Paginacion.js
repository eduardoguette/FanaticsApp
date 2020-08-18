import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import styled from "styled-components";
const DivNav = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  transition: 3s ease;
  .title-no-users {
    display: ${(props) => (props.users < 1 ? "block" : "none")};
    color: white;
    text-align: center;
    margin: 1em auto;
    transition: 4s ease;
    span {
      text-align: center;
    }
  }
  nav {
    margin: auto;
    ul {
      li {
        button {
          font-weight: bold;
          color: #000f25;
          padding: 0.5em 1em;
          font-size: 0.9em;
        }
      }
    }
    li:hover {
      cursor: pointer;
    }
    .prev {
      display: ${(props) => (props.count <= 1 ? "none" : "block")};
      border-radius: ${(props) => (props.users < 1 ? "4px" : "auto")};
    }
    .next {
      border-radius: ${(props) => (props.count <= 1 ? "4px" : "0 10px 10px 0")};
      display: ${(props) => (props.users < 1 ? "none" : "block")};
    }
  }
`;
let count = 1;
function Paginacion({ loading, users, pagina }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    users.then((data) => {
      setData(data);
    });
  }, [data, users]);
  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.className === "page-link prev") {
      count--;
    } else if (e.target.className === "page-link next") {
      count++;
    }
    pagina(count);
  };
  return (
    <DivNav users={data.length} count={count}>
      <div className="title-no-users">
        <p>No more users</p>
      </div>
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link prev" onClick={handleClick}>
              Previous
            </button>
          </li>
          <li className="page-item">
            <button className="page-link next" onClick={handleClick}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </DivNav>
  );
}

const mapStateToProps = (state) => ({
  users: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  pagina(count) {
    dispatch({
      type: "NEXT_PAGE",
      count,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Paginacion);
