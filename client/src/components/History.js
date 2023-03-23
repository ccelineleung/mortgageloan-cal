import React, { useContext, useEffect, useState } from 'react';
import HomeSavedList from './HomeSavedList';
import { redirect } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import { UserInfoContext } from '../context/AuthContext';
import jwt_decode from 'jwt-decode';
import Popup from 'reactjs-popup';
import InputForm from './InputForm';

const History = () => {
  const navigate = useNavigate();

  const { userInfo } = useContext(UserInfoContext);
  // if(!user.accesstoken) return navigate('/login')
  const [content, setContent] = useState('You need to login');
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    console.log(`userinfo from history`,userInfo)
    const user_Id = userInfo.userId

    const fetchProtected = async () => {
      console.log('this is accesstorken fodsiohfoahsfa',userInfo.accesstoken)
      const res = await fetch('api/users/protected', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'Application/JSON',
          authorization: `Bearer ${userInfo.accesstoken}`,
        },
      });
      const datas = await res.json();
      console.log(`datas from history`, datas);
      if (datas.data === undefined) {
        navigate('/account');
        return content;
      } else {
        setContent(datas.data);
        getAllData()
      }
    };

    // const token = localStorage.getItem('accesstoken');
    // let user_Id;
    // if (token) {
    //   const decoded = jwt_decode(token);

    //   user_Id = decoded.userId;
    //   setUserId(user_Id);
    // }

    // setUserId(decoded.userId);
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
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProtected();
    // if (user_Id) getAllData();
  }, [userInfo]);


  // console.log(`USERID from HISTORY.JS`, userId);

  const deleteHandler = async (id) => {
    const body = {
      userId: userId,
      home_id: id,
    };
    console.log(`THIS IS BODY FROM DELETE DATA`, body);
    try {
      const res = await fetch(`api/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'Application/JSON' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      // date -> after delete
      setUserData(data);
      // console.log(`userData`, userData);
    } catch (error) {
      console.log(error.message);
    }
  };


  const editHandler = async (id) => {
    const body = {
      userId: userId,
      home_id: id,
      name: name,
      address: address,
    };
    try {
      const res = await fetch(`api/editHomeInfo`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'Application/JSON' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      setUserData(data);
      // console.log(`userData`, userData);
    } catch (error) {
      console.log(error.message);
    }
  };

  // console.log(`111111111`, userData);
  // return (
  //   <>
  //     <h1>Target Home Lists</h1>
     
  //     <table className='styled-table'>
  //       <thead>
  //         <tr>
  //           <th>Name</th>
  //           <th>HOME VALUES</th>
  //           <th>DOWN PAYMENT</th>
  //           <th>LOAN AMOUNT</th>
  //           <th>INTEREST RATE</th>
  //           <th>LOAN TERM</th>
  //           <th>PAYMENT</th>
  //           <th>Edit</th>
  //           <th>DELETE</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {userData.map((data, index) => (
  //           <tr key={index}>
  //             <td>{data.name}</td>
  //             <td>{formatter.format(data.homevalue)}</td>
  //             <td>{formatter.format(data.downpayment)}</td>
  //             <td>{formatter.format(data.loanamount)}</td>
  //             <td>{data.interest}%</td>
  //             <td>{data.loanterm} Years</td>
  //             <td>{formatter.format(data.monthlypayment)}</td>
  //             <td>
  //               {/* <button onClick={() => editHandler(data.home_id)}>
  //                 Edit
  //               </button> */}
  //               <Popup trigger={<button> Edit </button>} modal nested>
  //                 {
  //                   // @ts-ignore
  //                   (close) => (
  //                     <div className='modal'>
  //                       <div className='content'>
  //                         <InputForm
  //                           text='Name'
  //                           placeholder={data.name}
  //                           onChange={(e) => setName(e.target.value)}
  //                           required
  //                         />
  //                         <InputForm
  //                           text='Address'
  //                           placeholder={data.address}
  //                           onChange={(e) => setAddress(e.target.value)}
  //                           required
  //                         />
  //                       </div>
  //                       <div>
  //                         {/* <button onClick={() => close()}>Save</button> */}
  //                         <button onClick={() => {editHandler(data.home_id),close()}}>
  //                           Confirm Change
  //                         </button>

  //                         <button onClick={() => close()}>Close</button>
  //                       </div>
  //                     </div>
  //                   )
  //                 }
  //               </Popup>
  //             </td>
  //             <td>
  //               <button onClick={() => deleteHandler(data.home_id)}>
  //                 Delete
  //               </button>
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </>
  // );
  
  return (
    <>
       <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Saved Homes</h1>
          {/* <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title, email and role.
          </p> */}
        </div>
      
      </div>
      <div className="mt-8 flow-root">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Home Value
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Downpayment
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Loan Amount
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Interest Rate
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Loan Term
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Payment
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {userData.map((data,index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {data.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{data.homevalue}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{data.downpayment}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{data.loanamount}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{data.interest}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{data.loanterm}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{data.monthlypayment}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" onClick={() => editHandler(data.home_id)} className="text-indigo-600 hover:text-indigo-900">
                          Edit<span className="sr-only">, {data.name}</span>
                        </a>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" onClick={() => deleteHandler(data.home_id)} className="text-indigo-600 hover:text-indigo-900">
                          Delete<span className="sr-only">, {data.name}</span>
                        </a>   
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
};

export default History;
