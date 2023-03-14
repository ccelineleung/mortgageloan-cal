import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import InputForm from './InputForm';
import jwt_decode from 'jwt-decode';

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

  useEffect(() => {
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
        <Popup trigger={<button> Save </button>} modal nested>
          {
            // @ts-ignore
            (close) => (
              <div className='modal'>
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
                  <button
                    onClick={() => {
                      handleSubmit(), close();
                    }}
                  >
                    Save
                  </button>
                  {errorMessage && <div>{errorMessage}</div>}
                  <button onClick={() => close()}>Close</button>
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
