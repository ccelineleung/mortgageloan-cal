import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserInfoContext } from '../context/AuthContext';

const Login = () => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const navigate = useNavigate();

  // userInfo = {};

  // onCHange =() => //update userInfo =>
  // userInfo = {username: celine, pw: 0412}

  // onSubmit = () => {
  // axios.get -> send request to server and verifiy user/pw info
  //  if (failed) ???
  // if (successful) -> redirect to homepage
  // }
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const LinktoSignIn = () => {
    navigate('/signup');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setUserInfo({
      ...userInfo,
      email: email,
      password: password,
    });

    const body = {
      email: email,
      password: password,
    };

    try {
      const res = await fetch(`api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'Application/JSON' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      // console.log(data);
      // if (data.status === true) {
      //   navigate('/');
      // } else {
      //   setErrorMessage('Wrong Email or Password')
      // }
      if (data.status === false) {
        setErrorMessage('Wrong Email or Password');
      }
      if (data.accesstoken) {
        setUserInfo({
          accesstoken: data.accesstoken,
        });
        navigate('/');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(()=>{
    console.log(userInfo)
  },[userInfo])

  return (
    <>
      <h1>Returning Customer Sign in</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <label htmlFor='pass'>Password:</label>
        <input
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        {errorMessage && (
          <div className='error-message login'>{errorMessage}</div>
        )}
        <input type='submit' value='Sign in'></input>
      </form>

      <div>
        <h1>New Customer</h1>
        <h3>Benefits of creating an account: </h3>
        <h3>&#x2022; One account, one login. </h3>
        <h3>&#x2022; Tracking history, and save the data</h3>

        <button onClick={() => LinktoSignIn()}>CREATE ACCOUNT</button>
      </div>
    </>
  );
};

export default Login;
