import React, { useState } from 'react';
import InputForm from './InputForm';
import DoughnutChart from '../charts/Doughnut';
import SaveButton from './SaveButton';

const CalculatorInput = () => {
  const initialState = {
    homeValue: '',
    downPayment: '',
    // percent: '',
    loanAmount: '',
    interestRate: '',
    loanTerm: '30',
    propertyTax: '0',
    PMIFee: '0',
    homeInsurance: '0',
    monthlyHOA: '0',
    monthlyPayment: '',
    finalFees: '',
  };
  const [calInput, setCalInput] = useState(initialState);

  const clearState = () => {
    setCalInput(initialState);
  };

  const [moreQuestion, setMoreQuestion] = useState(false);

  const calculateLoanAmount = () => {
    const newLoanAmount = calInput.homeValue - calInput.downPayment;
    setCalInput({ ...calInput, loanAmount: newLoanAmount });

    return calInput.loanAmount;
  };

  // const calculatorDownPayment = () => {
  //   const newDownPayment = calInput.percent * calInput.homeValue;
  //   setCalInput({ ...calInput, downPayment: newDownPayment });

  //   const newPercent = Math.round(calInput.downPayment / calInput.homeValue);
  //   setCalInput({ ...calInput, percent: newPercent });

  //   return calInput.downPayment || calInput.percent;
  // };

  const calculateMonthlyPayment = () => {
    const percentageToDecimal = (percent) => {
      return percent / 12 / 100;
    };

    const YTM = (year) => {
      return year * 12;
    };

    const newMonthlyPayment =
      percentageToDecimal(calInput.interestRate * calInput.loanAmount) /
      (1 -
        Math.pow(
          1 + percentageToDecimal(calInput.interestRate),
          -YTM(calInput.loanTerm)
        ));

    const twoDicimalMonthlyPayment = (
      Math.round(newMonthlyPayment * 100) / 100
    ).toString();
    setCalInput({ ...calInput, monthlyPayment: twoDicimalMonthlyPayment });

    return calInput.monthlyPayment;
  };

  const handleTerm = (e) => {
    setCalInput({ ...calInput, loanTerm: e.target.value });
  };

  const totalFee = () => {
    const newFinalFees =
      Number(calInput.monthlyPayment) +
      Number(calInput.PMIFee) +
      Number(calInput.homeInsurance) +
      Number(calInput.monthlyHOA) +
      Number(calInput.propertyTax);

    setCalInput({ ...calInput, finalFees: newFinalFees });
    // console.log(`this is monthly payment`, calInput.monthlyPayment);
    return calInput.finalFees;
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFactionDigits: 1,
  });

  return (
    <>
      <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-800'>
        Calculator
      </h2>
      {/* <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md grid grid-cols-1 gap-20'> */}
      <div className='mt-8 flex flex-row justify-center '>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 basis-1/3 '>
          <form onSubmit={(e) => e.preventDefault()}>
            <InputForm
              text='Home Value:'
              type='number'
              value={calInput.homeValue}
              onKeyUp={calculateLoanAmount}
              onInput={(e) =>
                setCalInput({ ...calInput, homeValue: e.target.value })
              }
              required
            />
            <InputForm
              text='Down Payment:'
              type='number'
              onKeyUp={calculateLoanAmount}
              value={calInput.downPayment}
              onInput={(e) =>
                setCalInput({ ...calInput, downPayment: e.target.value })
              }
              required
            />
            {/* <input
          type='number'
          onKeyUp={calculatorDownPayment}
          value={calInput.percent}
          onInput={(e) =>
            setCalInput({ ...calInput, percent: e.target.value })
          }
        ></input>
        % */}
            <InputForm
              text='Loan Amount:'
              type='number'
              value={calInput.loanAmount}
              required
              readOnly
            />
            {/* <InputForm
          text='Interest Rate:'
          type='number'
          value={calInput.interestRate}
          onInput={(e) =>
            setCalInput({ ...calInput, interestRate: e.target.value })
          }
          required
        /> */}
            <div>
              <label
                htmlFor='number'
                className='block mt-2 text-sm font-medium leading-6 text-gray-900'
              >
                Interest Rate
              </label>
              <div className='relative mt-2 rounded-md shadow-sm'>
                <input
                  className='block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  placeholder='0'
                  type='number'
                  value={calInput.interestRate}
                  onInput={(e) =>
                    setCalInput({ ...calInput, interestRate: e.target.value })
                  }
                  required
                />
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                  <span className='text-gray-500 sm:text-sm'>%</span>
                </div>
              </div>
            </div>

            <label className='block mt-2 text-sm font-medium leading-6 text-gray-900'>Loan Term:</label>
            <select onChange={handleTerm} className='mt-2 rounded-md'>
              <option value='30'>30-Years Fixed</option>
              <option value='25'>25-Years Fixed</option>
              <option value='15'>15-Years Fixed</option>
            </select>

            <br />

            {moreQuestion && (
              <>
                <InputForm
                  text='Property Tax:'
                  type='number'
                  onKeyUp={totalFee}
                  value={calInput.propertyTax}
                  onInput={(e) =>
                    setCalInput({ ...calInput, propertyTax: e.target.value })
                  }
                />
                <InputForm
                  text='PMI:'
                  type='number'
                  onKeyUp={totalFee}
                  value={calInput.PMIFee}
                  onInput={(e) =>
                    setCalInput({ ...calInput, PMIFee: e.target.value })
                  }
                />
                <InputForm
                  text='Home Insurance:'
                  type='number'
                  onKeyUp={totalFee}
                  value={calInput.homeInsurance}
                  onInput={(e) =>
                    setCalInput({ ...calInput, homeInsurance: e.target.value })
                  }
                />
                <InputForm
                  text='Monthly HOA:'
                  type='number'
                  onKeyUp={totalFee}
                  value={calInput.monthlyHOA}
                  onInput={(e) =>
                    setCalInput({ ...calInput, monthlyHOA: e.target.value })
                  }
                />
              </>
            )}

            {moreQuestion ? (
              <button
                type='button'
                className='rounded-md mt-3 mr-3 bg-indigo-50 py-1.5 px-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100'
                onClick={() => {
                  setMoreQuestion(false);
                }}
              >
                Hide Questions
              </button>
            ) : (
              <button
                onClick={() => {
                  setMoreQuestion(true);
                }}
                type='button'
                className='rounded-md mt-3 mr-3 bg-indigo-50 py-1.5 px-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100'
              >
                Show Questions
              </button>
            )}
            <br />
            <button
              type='button'
              className='rounded-md mt-3 mr-3 bg-indigo-600 py-1.5 px-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              onClick={calculateMonthlyPayment}
            >
              Calculate
            </button>
            <button
              type='button'
              className='rounded-md mt-3 bg-indigo-600 py-1.5 px-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              onClick={clearState}
            >
              Clear
            </button>
          </form>

          <h2>Monthly Payment {formatter.format(calInput.monthlyPayment)}</h2>
          <h2>Final Monthly Payment {formatter.format(calInput.finalFees)}</h2>
          {/* <button>Save</button> */}
          <SaveButton
            homeValue={calInput.homeValue}
            downPayment={calInput.downPayment}
            loanAmount={calInput.loanAmount}
            interestRate={calInput.interestRate}
            loanTerm={calInput.loanTerm}
            monthlyPayment={calInput.monthlyPayment}
            HOA={calInput.monthlyHOA}
            homeInsurance={calInput.homeInsurance}
            propertyTax={calInput.propertyTax}
            PMIFee={calInput.PMIFee}
            finalFees={calInput.finalFees}
          />
        </div>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 basis-1/3'>
          <DoughnutChart
            monthlyPayment={calInput.monthlyPayment}
            HOA={calInput.monthlyHOA}
            homeInsurance={calInput.homeInsurance}
            propertyTax={calInput.propertyTax}
            PMIFee={calInput.PMIFee}
            finalFees={calInput.finalFees}
          />
        </div>
      </div>
    </>
  );
};

export default CalculatorInput;

//添加数字逗号
