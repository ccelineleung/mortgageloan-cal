import React, { useEffect, useState } from 'react';

const HomeSavedList = ({ user_Id }) => {

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      const body = { userId: user_Id };
      console.log(`FRONTEND`,body)
      try {
        const res = await fetch(`api/allSavedforID`, {
          method: 'POST',
          headers: { 'Content-Type': 'Application/JSON' },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllData();
  }, []);

  console.log(`userdata`, userData);

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
