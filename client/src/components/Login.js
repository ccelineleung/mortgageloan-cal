import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

    const LinktoSignIn = () => {
      navigate('/signup')
    }

  return (
    <>
      <h1>Returning Customer Sign in</h1>
      <form>
        <label for='email'>Email:</label>
        <input type='email' pattern='.+@globex\.com' size='30' required></input>
        <label for='pass'>Password:</label>
        <input type='password' minLength='8' required></input>
      </form>
      <button type='submit'>Sign In</button>

      <div>
        <h1>New Customer</h1>
        <h3>Benefits of creating an account: </h3>
        <h3>&#x2022; One account, one login. </h3>
        <h3>&#x2022; Tracking history, and save the data</h3>
        
        <button onClick={()=>LinktoSignIn()}>CREATE ACCOUNT</button>
      </div>
    </>
  );
};

export default Login;
