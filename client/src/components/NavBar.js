import React from 'react';
import { Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const NavBar = ({ logOutCallback }) => {
  return (
    <header className=''>
      <nav
        // className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
        aria-label='Global'
      >
        <h3 className=''>Logo</h3>
        <ul>
          <Link to='/'>
            <li>Home</li>
          </Link>
          <Link to='/protected'>
            <li>History</li>
          </Link>
          <div className='py-6'>
            <Link to='/account'>
              <li>Account</li>
            </Link>
          </div>
          <button onClick={logOutCallback}>Log Out</button>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
