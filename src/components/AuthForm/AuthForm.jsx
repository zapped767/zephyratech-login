import React from 'react';
import './AuthForm.css';

const AuthForm = ({ children, title, subtitle }) => {
  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="mountain-illustration">
          <div className="mountain-layer mountain-1"></div>
          <div className="mountain-layer mountain-2"></div>
          <div className="mountain-layer mountain-3"></div>
          <div className="lake"></div>
          <div className="trees"></div>
        </div>
      </div>
      
      <div className="auth-content">
        <div className="auth-header">
          <div className="logo">
            <div className="logo-icon"></div>
            <span className="logo-text">Anywhere app.</span>
          </div>
          <nav className="auth-nav">
            <a href="/login">Home</a>
            <a href="/signup">Join</a>
          </nav>
        </div>
        
        <div className="auth-form-container">
          <div className="auth-form-content">
            <div className="form-header">
              <h1 className="form-title">{title}</h1>
              {subtitle && <p className="form-subtitle">{subtitle}</p>}
            </div>
            
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;