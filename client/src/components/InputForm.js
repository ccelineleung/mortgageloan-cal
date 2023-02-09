import React from 'react';

function InputForm({
  text,
  value,
  onInput,
  onKeyUp,
  readOnly = false,
  onChange,
  required = false,
}) {
  return (
    <div>
      <label>{text}</label>
      <input
        type='number'
        value={value}
        onInput={onInput}
        onKeyUp={onKeyUp}
        readOnly={readOnly}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

export default InputForm;
