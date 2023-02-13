import React from 'react';



const Signup = () => {
  return (
    <>
      <h1>Register</h1>
      <form>
        <label>Name: </label>
        <input required></input>
        <label for='email'>Email:</label>
        <input type='email' pattern='.+@globex\.com' size='30' required></input>
        <label for='pass'>Password:</label>
        <input type='password' minLength='8' required></input>
        <label for='pass'>Confirm Password:</label>
        <input type='password' minLength='8' required></input>
        <input type='submit' value='Create Account'></input>
      </form>
    </>
  );
};

export default Signup;