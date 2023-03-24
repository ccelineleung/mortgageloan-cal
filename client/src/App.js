import React, { useState, useEffect } from 'react';
// import { Route, Routes } from 'react-router';
import Homepage from './components/Homepage';
import History from './components/History';
import NavBar from './components/NavBar';
import Login from './components/Login';
// import { Router, Switch, Route, Link } from 'react-router'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';
import Signup from './components/Signup';
import { UserInfoContext } from './context/AuthContext';

import './style.css';

const App = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  //get a new accesstoken if a refreshtoken exist
  useEffect(() => {
    const checkRefreshToken = async () => {
      try {
        const res = await fetch('api/users/refresh_token', {
          method: 'GET',
          credentials: 'include', //needed to include the cookie
          headers: { 'Content-Type': 'Application/JSON' },
        });
        const data = await res.json();
        setUserInfo({
          ...userInfo,
          accesstoken: data.accesstoken,
        });
      } catch (err) {
        console.log(err.message);
      }
    };
    checkRefreshToken();
  }, []);

  return (
    <>
      <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
        {/* <SignupContext.Provider value={{ signupInfo, setSignupInfo }}> */}
        <NavBar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/protected' element={<History />} />
          <Route path='/account' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
        {/* </SignupContext.Provider> */}
      </UserInfoContext.Provider>
    </>
  );
};

export default App;
