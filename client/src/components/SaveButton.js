import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import InputForm from './InputForm';

const SaveButton = () => {
  const saveInfo = async () => {
    const body = {};
  };

  return (
    <>
      <div>
        <Popup trigger={<button> Save </button>} modal nested>
          {(close) => (
            <div className='modal'>
              <div className='content'>
                <InputForm text='Name' required />
                <InputForm text='Address' required />
                <InputForm text='Additional Info' />
              </div>
              <div>
                <button onClick={() => close()}>Save</button>
                <button onClick={() => close()}>Close</button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </>
  );
};

export default SaveButton;
