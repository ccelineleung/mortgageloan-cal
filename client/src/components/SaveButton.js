import React, { useState, useEffect, useContext } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import InputForm from './InputForm';
import jwt_decode from 'jwt-decode';
import { UserInfoContext } from '../context/AuthContext';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';

const SaveButton = ({
  homeValue,
  downPayment,
  loanAmount,
  interestRate,
  loanTerm,
  monthlyPayment,
  HOA,
  homeInsurance,
  propertyTax,
  PMIFee,
  finalFees,
}) => {
  const [name, setName] = useState('');
  const [streetAddress, setStreetAddress] = useState('none');
  const [city, setCity] = useState('none');
  const [state, setState] = useState('none');
  const [zipCode, setZipCode] = useState('none');
  const [additionalInfo, setAddtionalInfo] = useState('');
  const [userId, setUserId] = useState('');
  const { userInfo } = useContext(UserInfoContext);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (userInfo.userId) {
      setUserId(userInfo.userId);
      setLoggedIn(true);
    }
  }, [userInfo]);

  const handleSubmit = async (e) => {
    // e.preventDefault();

    const body = {
      userId: userId,
      homeValue: homeValue,
      downPayment: downPayment,
      loanAmount: loanAmount,
      interestRate: interestRate,
      loanTerm: loanTerm,
      monthlyPayment: monthlyPayment,
      HOA: HOA,
      homeInsurance: homeInsurance,
      propertyTax: propertyTax,
      PMIFee: PMIFee,
      finalFees: finalFees,
      name: name,
      streetaddress: streetAddress,
      city: city,
      state: state,
      zipCode: zipCode,
      additionalInfo: additionalInfo,
    };
    try {
      const res = await fetch(`api/addtoDB`, {
        method: 'POST',
        headers: { 'Content-Type': 'Application/JSON' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (data.status === true) {
        close();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div>
        <Popup
          trigger={
            <button
              type='button'
              className='rounded-md mt-3 mr-3 bg-indigo-600 py-1.5 px-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              {' '}
              Save{' '}
            </button>
          }
          modal
          nested
        >
          {
            // @ts-ignore
            (close) => (
              <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                <div className='absolute top-0 right-0 hidden pt-4 pr-4 sm:block'>
                  <button
                    type='button'
                    className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    onClick={() => close()}
                  >
                    <span className='sr-only'>Close</span>
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>
                <div className='content'>
                  <label className='block text-sm font-medium leading-6 text-gray-900'>
                    Name
                  </label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    className='block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    required
                  />
                  {/* <label className='block text-sm font-medium leading-6 text-gray-900'>
                    Address
                  </label>
                  <input
                    className='block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  /> */}

                  <div className='mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                    <div className='col-span-full'>
                      <label
                        htmlFor='street-address'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        Street address
                      </label>
                      <div className='mt-2'>
                        <input
                          onChange={(e) => setStreetAddress(e.target.value)}
                          type='text'
                          name='street-address'
                          id='street-address'
                          autoComplete='street-address'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-2 sm:col-start-1'>
                      <label
                        htmlFor='city'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        City
                      </label>
                      <div className='mt-2'>
                        <input
                          onChange={(e) => setCity(e.target.value)}
                          type='text'
                          name='city'
                          id='city'
                          autoComplete='address-level2'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-2 '>
                      <label
                        htmlFor='region'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        State
                      </label>
                      <div className='mt-2'>
                        <input
                          onChange={(e) => setState(e.target.value)}
                          type='text'
                          name='region'
                          id='region'
                          autoComplete='address-level1'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-2'>
                      <label
                        htmlFor='postal-code'
                        className='block text-sm font-medium leading-6 text-gray-900'
                      >
                        ZIP / Postal code
                      </label>
                      <div className='mt-2'>
                        <input
                          onChange={(e) => setZipCode(e.target.value)}
                          type='text'
                          name='postal-code'
                          id='postal-code'
                          autoComplete='postal-code'
                          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        />
                      </div>
                    </div>
                  </div>

                  <label className='block mt-5 text-sm font-medium leading-6 text-gray-900'>
                    Additional Info
                  </label>
                  <textarea
                    className='block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6'
                    onChange={(e) => setAddtionalInfo(e.target.value)}
                  />
                </div>
                <div>
                  {/* <button onClick={() => close()}>Save</button> */}
                  <br />
                  <button
                    onClick={() => {
                      handleSubmit(), close();
                    }}
                    type='button'
                    className='rounded-md bg-indigo-600 py-1.5 px-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  >
                    Save
                  </button>
                  <br />
                  {loggedIn === false && (
                    <div className='rounded-md mt-3 bg-yellow-50 p-4'>
                      <div className='flex'>
                        <div className='flex-shrink-0'>
                          <ExclamationTriangleIcon
                            className='h-5 w-5 text-yellow-400'
                            aria-hidden='true'
                          />
                        </div>
                        <div className='ml-3'>
                          <h3 className='text-sm font-medium text-yellow-800'>
                            Attention needed
                          </h3>
                          <div className='mt-2 text-sm text-yellow-700'>
                            <p>Please log in or resgister to save</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          }
        </Popup>
      </div>
    </>
  );
};

export default SaveButton;
