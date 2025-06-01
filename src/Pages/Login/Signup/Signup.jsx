import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthForm from '../../components/AuthForm/AuthForm';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
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
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
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
    <AuthForm 
      title="Create new account"
      subtitle="Start for free"
    >
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="name-fields">
          <InputField
            type="text"
            name="firstName"
            label="First Name"
            placeholder="Michal"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            required
            icon="👤"
          />
          
          <InputField
            type="text"
            name="lastName"
            label="Last Name"
            placeholder="Masiak"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
            icon="👤"
          />
        </div>
        
        <InputField
          type="email"
          name="email"
          label="Email"
          placeholder="michal.masiak@anywhere.co"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
          icon="✉️"
        />
        
        <InputField
          type="password"
          name="password"
          label="Password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
          icon="🔒"
        />
        
        <InputField
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
          icon="🔒"
        />
        
        <div className="form-options">
          <label className="terms-agreement">
            <input type="checkbox" required />
            <span>
              I agree to the{' '}
              <Link to="/terms" className="terms-link">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy" className="terms-link">Privacy Policy</Link>
            </span>
          </label>
        </div>
        
        <Button
          type="submit"
          loading={loading}
          fullWidth
          size="large"
        >
          Create account
        </Button>
        
        <div className="auth-switch">
          <p>
            Already a member?{' '}
            <Link to="/login" className="auth-link">
              Log In
            </Link>
          </p>
        </div>
      </form>
    </AuthForm>
  );
};

export default Signup;