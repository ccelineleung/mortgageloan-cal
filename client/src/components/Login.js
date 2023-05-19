import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { use } from '../../../server/s erver';
import { UserInfoContext } from '../context/AuthContext';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { FaHome } from 'react-icons/fa';

const Login = () => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [rerender, setRerender] = useState(false);

  const linktoSignUp = () => {
    navigate('/signup');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

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
        setErrorMessage('Invaild Email or Password');
      }
      // console.log(`data from frontend log in`, data);
      if (data.status === true) {
        setUserInfo({
          ...userInfo,
          userId: data.userId,
          username: data.username,
          accesstoken: data.accesstoken,
        });
        // console.log(`second userinfo`, userInfo);
        // localStorage.setItem('accesstoken', data.accesstoken);
        // console.log(`data.accesstoken from login`,data)
        navigate('/');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const CLIENT_ID = '9cd0743fffb166dd3058';

  const linktoGithub = async () => {
    await window.location.assign(
      'https://github.com/login/oauth/authorize?client_id=' + CLIENT_ID
    );
  };

  const getUserData = async () => {
    await fetch('api/github/getUserData', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer' + localStorage.getItem('accessToken'), //Bearer ACCESSTOKEN
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code');
    console.log(`codeParam`, codeParam);

    if (codeParam && localStorage.getItem('accessToken') === null) {
      const getAccessToken = async () => {
        await fetch('api/github/getAccessToken?code=' + codeParam, {
          method: 'GET',
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            if (data.access_token) {
              localStorage.setItem('accessToken', data.access_token);
              setRerender(!rerender);
            }
          });
      };
      getAccessToken();
    }
  }, [linktoGithub]);

  return (
    <>
      {/* <h1>Returning Customer Sign in</h1>
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
      </div> */}

      <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <FaHome className='mx-auto h-12 w-auto' />
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Or{' '}
            <button
              onClick={() => linktoSignUp()}
              className='font-medium text-indigo-600 hover:text-indigo-500'
            >
              Create Account
            </button>
          </p>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form
              className='space-y-6'
              action='#'
              method='POST'
              onSubmit={handleLogin}
            >
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Email address
                </label>
                <div className='mt-2'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
                <div className='mt-2'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete='current-password'
                    required
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input
                    id='remember-me'
                    name='remember-me'
                    type='checkbox'
                    className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                  />
                  <label
                    htmlFor='remember-me'
                    className='ml-2 block text-sm text-gray-900'
                  >
                    Remember me
                  </label>
                </div>

                <div className='text-sm'>
                  <a
                    href='#'
                    className='font-medium text-indigo-600 hover:text-indigo-500'
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              {errorMessage && (
                <div className='error-message login'>
                  <div className='rounded-md bg-red-50 p-4'>
                    <div className='flex'>
                      <div className='flex-shrink-0'>
                        <XCircleIcon
                          className='h-5 w-5 text-red-400'
                          aria-hidden='true'
                        />
                      </div>
                      <div className='ml-3'>
                        <h3 className='text-sm font-medium text-red-800'>
                          Invaild email or password
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div>
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className='mt-6'>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-300' />
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='bg-white px-2 text-gray-500'>
                    Or continue with
                  </span>
                </div>
              </div>

              <div className='mt-6 grid grid-cols-3 gap-3'>
                <div>
                  <a
                    href='#'
                    className='inline-flex w-full justify-center rounded-md bg-white py-2 px-4 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                  >
                    <span className='sr-only'>Sign in with Facebook</span>
                    <svg
                      className='h-5 w-5'
                      aria-hidden='true'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </a>
                </div>

                <div>
                  <a
                    href='#'
                    className='inline-flex w-full justify-center rounded-md bg-white py-2 px-4 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                  >
                    <span className='sr-only'>Sign in with Twitter</span>
                    <svg
                      className='h-5 w-5'
                      aria-hidden='true'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84' />
                    </svg>
                  </a>
                </div>

                <div>
                  <a
                    onClick={() => linktoGithub()}
                    href='#'
                    className='inline-flex w-full justify-center rounded-md bg-white py-2 px-4 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                  >
                    <span className='sr-only'>Sign in with GitHub</span>
                    <svg
                      className='h-5 w-5'
                      aria-hidden='true'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
