import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/home' element={<Homepage />} />
      </Routes> 
      <h1>hello world</h1>
    </>
  );
};

export default App;
