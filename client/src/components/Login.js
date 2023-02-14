
import React, { useContext, useEffect } from 'react';
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


  const LinktoSignIn = () => {
    navigate('/signup');
  };

  return (
    <>
      <h1>Returning Customer Sign in</h1>
      <form>
        <label htmlFor='email'>Email:</label>
        <input type='email' pattern='.+@globex\.com' size='30' required></input>
        <label htmlFor='pass'>Password:</label>
        <input type='password' minLength='8' required></input>
      </form>
      <button type='submit'>Sign In</button>

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
