import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ logOutCallback }) => {
  return (
    <nav>
      <h3>Logo</h3>
      <ul>
        <Link to='/'>
          <li>Home</li>
        </Link>
        <Link to='/protected'>
          <li>History</li>
        </Link>
        <Link to='/account'>
          <li>Account</li>
        </Link>
        <button onClick={logOutCallback}>Log Out</button>
      </ul>
    </nav>
  );
};

export default NavBar;
