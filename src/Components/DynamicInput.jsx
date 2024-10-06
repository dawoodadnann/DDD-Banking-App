import React, { useState } from 'react';
import './DynamicInput.css';

const DynamicInput = ({ label, type, value = '', onChange, name }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="input-container">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`textbox ${isFocused || value ? 'active' : ''}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(value.length > 0)}
      />
      <label className={`label ${isFocused || value ? 'active' : ''}`}>
        {label}
      </label>
    </div>
  );
};

export default DynamicInput;
