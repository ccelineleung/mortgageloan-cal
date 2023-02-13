import React from 'react';
// import { Route, Routes } from 'react-router';

import Homepage from './components/Homepage';
import History from './components/History';
import NavBar from './components/NavBar';
import Login from './components/Login';
// import { Router, Switch, Route, Link } from 'react-router'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Signup';

const App = () => {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/history' element={<History />} />
        <Route path='/account' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
