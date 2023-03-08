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
// import { SignupContext } from './context/AuthContext';

const App = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  // const [signupInfo, setSignupInfo] = useState({});

  const [loading, setLoading] = useState(true);
  const logOutCallback = async () => {
    const res = await fetch('api/users/logout', {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'Application/JSON' },
    });
   
    await res.json();
    //clean user from context
    setUserInfo({});
    //navigate back to startpage
    navigate('/account');
  };

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
          user_id:data.user_id,
          accesstoken: data.accesstoken,
        });
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    checkRefreshToken();
  }, []);

  // if (loading) return <div>Loading ... </div>;

  return (
    <>
      <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
        {/* <SignupContext.Provider value={{ signupInfo, setSignupInfo }}> */}
          <NavBar logOutCallback={logOutCallback} />
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
