import React from 'react';
import { Link } from 'react-router-dom';

function ButtonBack() {
  return (
    <div className="container-btn back">
      <Link to="/home">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="34"
          viewBox="0 0 24 24"
          width="34"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"
            fill="white"
          />
        </svg>
      </Link>
    </div>
  );
}

export default ButtonBack;
