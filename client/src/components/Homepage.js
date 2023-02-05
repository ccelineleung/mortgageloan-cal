import React from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button>Home</button>
      <button>History</button>
      <button>Account</button>
    </div>
  );
};

export default Homepage;
