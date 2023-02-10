import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = () => {
  return (
    <nav>
      <h3>Logo</h3>
      <ul>
        <Link to='/'>
          <li>Home</li>
        </Link>
        <Link to='/history'>
          <li>History</li>
        </Link>
        <Link to='/account'>
          <li>Account</li>
        </Link>
      </ul>
    </nav>
  
  );
};

export default NavBar;
