import React, { useContext, useEffect, useState } from 'react';
import HomeSavedList from './HomeSavedList';
import { redirect } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import { UserInfoContext } from '../context/AuthContext';
import jwt_decode from 'jwt-decode';

const History = () => {
  const navigate = useNavigate();

  const { userInfo } = useContext(UserInfoContext);
  // if(!user.accesstoken) return navigate('/login')
  const [content, setContent] = useState('You need to login');
  const [userData, setUserData] = useState([]);
  // const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchProtected = async () => {
      const res = await fetch('api/users/protected', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'Application/JSON',
          authorization: `Bearer ${userInfo.accesstoken}`,
        },
      });
      const datas = await res.json();

      if (datas.data === undefined) {
        navigate('/account');
        return content;
      } else {
        setContent(datas.data);
      }
    };

    const token = localStorage.getItem('accesstoken');
    const decoded = jwt_decode(token);
    // setUserId(decoded.userId);
    const user_Id = decoded.userId;

    const getAllData = async () => {
      const body = { userId: user_Id };

      try {
        const res = await fetch(`api/allSavedforID`, {
          method: 'POST',
          headers: { 'Content-Type': 'Application/JSON' },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        setUserData(data);
        console.log(`NEW DATA`, data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProtected();
    getAllData();
  }, [userInfo]);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFactionDigits: 2,
  });
  // console.log(`USERID from HISTORY.JS`, userId);
  return (
    <>
      <h1>Target Home Lists</h1>
      {/* <HomeSavedList userId={userId} /> */}
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
        <tbody>
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
        </tbody>
      </table>
    </>
  );
};

export default History;
