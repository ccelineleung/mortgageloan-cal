import React, { useState, useContext, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FaHome } from 'react-icons/fa';
import { UserInfoContext } from '../context/AuthContext';
import jwt_decode from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'History', href: '/protected' },
];
const NavBar = () => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [LoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState();
  const navigate = useNavigate();

  console.log('userInfo from Navbar', userInfo);

  const logOutCallback = async () => {
    const res = await fetch('api/users/logout', {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'Application/JSON' },
    });

    await res.json();
    //clean user from context
    setUserInfo({});
    setLoggedIn(false);
    // localStorage.clear();
    //navigate back to startpage
    navigate('/account');
  };

  const linktoOther = (link) => {
    navigate(link);
  };

  const linktoSignIn = () => {
    navigate('/account');
  };

  useEffect(() => {
    // console.log(req.cookies.refreshtoken)

    if (userInfo.username) {
      const username = userInfo.username;
      setUsername(username);
      setLoggedIn(true);
    }
  }, [userInfo]);

  return (
    <header className='divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow'>
      <nav
        className='flex items-center justify-between p-6 lg:px-8'
        aria-label='Global'
      >
        <div className='flex lg:flex-1'>
          <Link to='/' className='-m-1.5 p-1.5'>
            <FaHome className='h-8 w-auto' />
          </Link>
          <div className='flex justify-between p-2'>
            <h3>Mortgage Calculator</h3>
          </div>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        <div className='hidden lg:flex  lg:gap-x-12'>
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => linktoOther(item.href)}
              className='text-sm font-semibold leading-6 text-gray-900'
            >
              {item.name}
            </button>
          ))}
        </div>

        {LoggedIn === true && (
          <div>
            <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
              <h2 className='text-sm font-semibold leading-6 text-gray-900'>
                Hello,{username}
              </h2>
              <button
                onClick={logOutCallback}
                className='text-sm font-semibold leading-6 text-gray-900'
              >
                Log out
              </button>
            </div>
          </div>
        )}

        {LoggedIn === false && (
          <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
            <button
              onClick={() => {
                linktoSignIn();
              }}
              className='text-sm font-semibold leading-6 text-gray-900'
            >
              Log in <span aria-hidden='true'>&rarr;</span>
            </button>
          </div>
        )}
      </nav>

      <Dialog
        as='div'
        className='lg:hidden'
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className='fixed inset-0 z-10' />
        <Dialog.Panel className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <Link to='/' className='-m-1.5 p-1.5'>
              <FaHome className='h-8 w-auto' />
            </Link>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <XMarkIcon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6'>
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => linktoOther(item.href)}
                    className='-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              {LoggedIn === true && (
                <div className='py-6'>
                  <h2 className='text-sm font-semibold leading-8 text-gray-900'>
                    Hello, {username}
                  </h2>
                  <button
                    onClick={logOutCallback}
                    className='-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-800 hover:bg-gray-50'
                  >
                    Log Out
                  </button>
                </div>
              )}
              {LoggedIn === false && (
                <div className='py-6'>
                  <button
                    onClick={() => {
                      linktoSignIn();
                    }}
                    className='-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                  >
                    Log in
                  </button>
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default NavBar;
