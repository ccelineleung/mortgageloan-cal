import React, { useState } from 'react';
import InputForm from './InputForm';

const CalculatorInput = () => {
  const [calInput, setCalInput] = useState({
    homeValue: '',
    downPayment: '',
    loanAmount: '',
    interestRate: '',
    loanTerm: '30',
    propertyTax: '0',
    PMI: '0',
    homeInsurance: '0',
    monthlyHOA: '0',
    monthlyPayment: '0',
  });

  const calculateLoanAmount = () => {
    const newLoanAmount = calInput.homeValue - calInput.downPayment;
    setCalInput({ ...calInput, loanAmount: newLoanAmount });
    return calInput.loanAmount;
  };

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
    setCalInput({ ...calInput, monthlyPayment: newMonthlyPayment });

    return calInput.monthlyPayment;
  };

  const handleTerm = (e) => {
    setCalInput({...calInput, loanTerm: e.target.value});
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFactionDigits: 2,
  });

  return (
    <>
      <h2>Calculator</h2>
      <form>
        <InputForm
          text='Home Value:'
          value={calInput.homeValue}
          onKeyUp={calculateLoanAmount}
          onInput={(e) =>
            setCalInput({ ...calInput, homeValue: e.target.value })
          }
          required
        />
        <InputForm
          text='Down Payment:'
          onKeyUp={calculateLoanAmount}
          value={calInput.downPayment}
          onInput={(e) =>
            setCalInput({ ...calInput, downPayment: e.target.value })
          }
          required
        />
        <input type='number'></input>%
        <InputForm
          text='Loan Amount:'
          value={calInput.loanAmount}
          required
          readOnly
        />
        <InputForm text='Interest Rate:' required />
        <label>Loan Term:</label>
        <select onChange={handleTerm}>
          <option value='30'>30-Years Fixed</option>
          <option value='25'>25-Years Fixed</option>
          <option value='15'>15-Years Fixed</option>
        </select>
        <InputForm text='Property Tax:' />
        <InputForm text='PMI:' />
        <InputForm text='Home Insurance:' />
        <InputForm text='Monthly HOA:' />
        <button onClick={calculateMonthlyPayment}>Calculate</button>
      </form>
      <h2>Monthly Payment {formatter.format(calInput.monthlyPayment)}</h2>
      <h2>Monthly Payment + fees</h2>
      <button>Save</button>
    </>
  );
};

export default CalculatorInput;
