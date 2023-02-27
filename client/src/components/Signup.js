import React, { useState, useContext, useEffect } from 'react';
import { SignupContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const { signupInfo, setSignupInfo } = useContext(SignupContext);
  const [errorMessage, setErrorMessage] = useState(null); // set errorMessage if passwords do not match

  // Controlled or uncontrolled?
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  // const [userInput, setUserInput] = useState({
  //   username:'',
  //   email:'',
  //   password:'',
  //   password2:''
  // })

  // const handleChangeForm = (e) => {
  //   // setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });

  //   setSignupInfo({ ...signupInfo, username: username, email: email , password:password});
  //   return;
  // };

  // useEffect(() => {
  //   console.log(signupInfo);
  // });

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setErrorMessage('Password do not match');
      return;
    }

    setSignupInfo({
      ...signupInfo,
      username: username,
      email: email,
      password: password,
    });
    // axios
    //   .post('/users/signup', { username, email, password })
    //   .then((res) => {
    //     const data =  res.json();
    //     if (data.status === true)
    //     navigate('/');
    //   })
    //   .catch((err) => {
    //     const error = err.response.data.message;
    //     setErrorMessage(error);
    //   });

    const body = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const res = await fetch(`api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'Application/JSON' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      console.log(data);
      if (data.status === true) {
        navigate('/');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <label htmlFor='username'>Userame:</label>
        <input
          type='text'
          id='username'
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        ></input>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <label htmlFor='pass'>Password:</label>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <label htmlFor='pass'>Confirm Password:</label>
        <input
          type='password'
          id='password2'
          name='password2'
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        ></input>
        {errorMessage && (
          <div className='error-message login'>{errorMessage}</div>
        )}
        <input type='submit' value='Create Account'></input>
      </form>
    </>
  );
};

export default Signup;
