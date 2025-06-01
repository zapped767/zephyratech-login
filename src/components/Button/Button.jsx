import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  className = ''
}) => {
  const buttonClass = `
    btn 
    btn-${variant} 
    btn-${size} 
    ${fullWidth ? 'btn-full-width' : ''} 
    ${loading ? 'btn-loading' : ''} 
    ${className}
  `.trim();

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <div className="btn-spinner"></div>}
      {icon && !loading && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;