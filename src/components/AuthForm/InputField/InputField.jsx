import React, { useState } from 'react';
import './InputField.css';

const InputField = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  name,
  label,
  error,
  required = false,
  icon
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="input-field-container">
      {label && (
        <label className="input-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <div className={`input-wrapper ${focused ? 'focused' : ''} ${error ? 'error' : ''}`}>
        {icon && <div className="input-icon">{icon}</div>}
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          className="input-field"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
        />
        {type === 'password' && (
          <button
            type="button"
            className="password-toggle"
            onClick={handleTogglePassword}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default InputField;