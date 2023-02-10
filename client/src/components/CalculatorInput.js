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

    setCalInput({ ...calInput, monthlyPayment: newMonthlyPayment });

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

    return calInput.finalFees;
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFactionDigits: 1,
  });

  return (
    <>
      <h2>Calculator</h2>
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
        <InputForm
          text='Interest Rate:'
          type='number'
          value={calInput.interestRate}
          onInput={(e) =>
            setCalInput({ ...calInput, interestRate: e.target.value })
          }
          required
        />
        <label>Loan Term:</label>
        <select onChange={handleTerm}>
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
              onInput={(e) =>
                setCalInput({ ...calInput, propertyTax: e.target.value })
              }
            />
            <InputForm
              text='PMI:'
              type='number'
              onKeyUp={totalFee}
              onInput={(e) =>
                setCalInput({ ...calInput, PMIFee: e.target.value })
              }
            />
            <InputForm
              text='Home Insurance:'
              type='number'
              onKeyUp={totalFee}
              onInput={(e) =>
                setCalInput({ ...calInput, homeInsurance: e.target.value })
              }
            />
            <InputForm
              text='Monthly HOA:'
              type='number'
              onKeyUp={totalFee}
              onInput={(e) =>
                setCalInput({ ...calInput, monthlyHOA: e.target.value })
              }
            />
          </>
        )}

        {moreQuestion ? (
          <button
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
          >
            Show Questions
          </button>
        )}
        <br />
        <button onClick={calculateMonthlyPayment}>Calculate</button>
        <button onClick={clearState}>Clear</button>
      </form>
      <h2>Monthly Payment {formatter.format(calInput.monthlyPayment)}</h2>
      <h2>Final Monthly Payment {formatter.format(calInput.finalFees)}</h2>
      {/* <button>Save</button> */}
      <SaveButton />

      <DoughnutChart
        monthlyPayment={calInput.monthlyPayment}
        HOA={calInput.monthlyHOA}
        homeInsurance={calInput.homeInsurance}
        propertyTax={calInput.propertyTax}
        PMIFee={calInput.PMIFee}
        finalFees={calInput.finalFees}
      />
    </>
  );
};

export default CalculatorInput;

//添加数字逗号
