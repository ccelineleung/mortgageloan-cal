import React from 'react';

const HomeSavedList = () => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFactionDigits: 2,
  });

  return (
    <>
      
      <table className='styled-table'>
        <thead>
          <tr>
            <th>HOME VALUES</th>
            <th>DOWN PAYMENT</th>
            <th>LOAN AMOUNT</th>
            <th>INTEREST RATE</th>
            <th>LOAN TERM</th>
            <th>PAYMENT</th>
            <th>DELETE</th>
          </tr>
        </thead>
        {/* <tbody>
          {userData.map((data, index) => (
            <tr key={index}>
              <td>{formatter.format(data.homevalue)}</td>
              <td>{formatter.format(data.downpayment)}</td>
              <td>{formatter.format(data.loanamount)}</td>
              <td>{data.interestrate}</td>
              <td>{data.loanterm}</td>
              <td>{formatter.format(data.payment)}</td>
              <td>
                <button onClick={() => deleteDatafromDB(data.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody> */}
      </table>
    </>
  );
};

export default HomeSavedList;
