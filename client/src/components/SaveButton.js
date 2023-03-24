import React, { useState, useEffect, useContext } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import InputForm from './InputForm';
import jwt_decode from 'jwt-decode';
import { UserInfoContext } from '../context/AuthContext';
import { XMarkIcon } from '@heroicons/react/24/outline';

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
  const [address, setAddress] = useState('');
  const [additionalInfo, setAddtionalInfo] = useState('');
  const [userId, setUserId] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const { userInfo } = useContext(UserInfoContext);

  useEffect(() => {
    // if (userInfo.userId) {
    //   setUserId(userInfo.userId)
    // } else {
    //   setErrorMessage('PLEASE LOG IN OR RESGISTER IN ORDER TO SAVE')
    // }
    const token = localStorage.getItem('accesstoken');

    if (token) {
      const decoded = jwt_decode(token);
      //   console.log(`DECODED`, decoded.userId);
      setUserId(decoded.userId);
    } else {
      setErrorMessage('PLEASE LOG IN OR RESGISTER IN ORDER TO SAVE');
    }
  }, []);

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
      address: address,
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
              className='rounded-md bg-indigo-600 py-1.5 px-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
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
                  <InputForm
                    text='Name'
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <InputForm
                    text='Address'
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                  <InputForm
                    text='Additional Info'
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
                  {errorMessage && <div>{errorMessage}</div>}
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
