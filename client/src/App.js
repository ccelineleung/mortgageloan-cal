import React, { useState } from 'react';
// import { Route, Routes } from 'react-router';

import Homepage from './components/Homepage';
import History from './components/History';
import NavBar from './components/NavBar';
import Login from './components/Login';
// import { Router, Switch, Route, Link } from 'react-router'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Signup';
import { UserInfoContext } from './context/AuthContext';
import { SignupContext } from './context/AuthContext';

const App = () => {
  const [userInfo, setUserInfo] = useState({});
  const [signupInfo, setSignupInfo] = useState({});

  return (
    <>
      <NavBar />
      <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
        <SignupContext.Provider value={{ signupInfo, setSignupInfo }}>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/history' element={<History />} />
            <Route path='/account' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </SignupContext.Provider>
      </UserInfoContext.Provider>
    </>
  );
};

export default App;
