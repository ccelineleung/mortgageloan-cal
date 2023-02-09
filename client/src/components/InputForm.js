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
}) {
  return (
    <div>
      <label>{text}</label>
      <input
        type={type}
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
