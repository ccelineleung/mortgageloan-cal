import React from 'react';

function InputForm({
  type,
  text,
  value,
  onInput,
  onKeyUp,
  readOnly = false,
  onChange,
  required = false,
  placeholder,
  className,
}) {
  return (

    <div>
      <label
        htmlFor='price'
        className='block mt-2 text-sm font-medium leading-6 text-gray-900'
      >
        {text}
      </label>
      <div className='relative mt-2 rounded-md shadow-sm'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <span className='text-gray-500 sm:text-sm'>$</span>
        </div>
        <input
          type={type}
          value={value}
          className='block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          placeholder='0.00'
          aria-describedby='price-currency'
          onInput={onInput}
          onKeyUp={onKeyUp}
          readOnly={readOnly}
          onChange={onChange}
          required={required}
        />
      </div>
     
    </div>
  );
}

export default InputForm;
