import React from 'react';
import CalculatorInput from './CalculatorInput';

const Homepage = () => {
  // const navigate = useNavigate();
  return (
    <div>
      <h1>Mortgage Calculator</h1>
      <button>Home</button>
      <button>History</button>
      <button>Account</button>
      <CalculatorInput/>
    </div>
  );
};

export default Homepage;
