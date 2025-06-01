import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      
      if (result.success) {
        toast.success('Account created successfully! Please sign in.');
        navigate('/login');
      } else {
        toast.error(result.error || 'Signup failed');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <div className="signup-form-section">
          <div className="signup-header">
            <div className="brand">
              <div className="brand-icon"></div>
              <span className="brand-text">Anywhere app.</span>
            </div>
            <nav className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/join" className="nav-link active">Join</Link>
            </nav>
          </div>
          
          <div className="form-container">
            <div className="form-header">
              <p className="form-subtitle">START FOR FREE</p>
              <h1 className="form-title">Create new account.</h1>
              <p className="form-switch">
                Already A Member? <Link to="/login" className="login-link">Log In</Link>
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="signup-form">
              <div className="name-row">
                <div className="input-group">
                  <label className="input-label">First name</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`form-input ${errors.firstName ? 'error' : ''}`}
                    />
                    <span className="input-icon">👤</span>
                  </div>
                  {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                </div>
                
                <div className="input-group">
                  <label className="input-label">Last name</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`form-input ${errors.lastName ? 'error' : ''}`}
                    />
                    <span className="input-icon">👤</span>
                  </div>
                  {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                </div>
              </div>
              
              <div className="input-group">
                <label className="input-label">Email</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                  />
                  <span className="input-icon">✉️</span>
                </div>
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              
              <div className="input-group">
                <label className="input-label">Password</label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter the password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-input ${errors.password ? 'error' : ''}`}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    👁️
                  </button>
                </div>
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>
              
              <div className="form-options">
                <p className="change-method">Change method</p>
              </div>
              
              <button
                type="submit"
                className="create-account-btn"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create account'}
              </button>
            </form>
          </div>
        </div>
        
        <div className="signup-image-section">
          <div className="mountain-image"></div>
          <div className="logo-overlay">
            <div className="logo-symbol">≡</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;