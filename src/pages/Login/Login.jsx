import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import AuthForm from '../../components/AuthForm';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import { useAuth } from '../../hooks/useAuth';
import './Login.css';


console.log("=== COMPONENT IMPORTS DEBUG ===");
console.log("AuthForm:", AuthForm);
console.log("AuthForm type:", typeof AuthForm);
console.log("AuthForm default:", AuthForm?.default);
console.log("InputField:", InputField);
console.log("InputField type:", typeof InputField);
console.log("InputField default:", InputField?.default);
console.log("Button:", Button);
console.log("Button type:", typeof Button);
console.log("Button default:", Button?.default);
console.log("=== END DEBUG ===");

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      const result = await login({
        username: formData.username,
        password: formData.password
      });

      if (result.success) {
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        toast.error(result.error || 'Login failed');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Test if components are valid before rendering
  if (typeof AuthForm !== 'function') {
    console.error('AuthForm is not a function:', AuthForm);
    return <div>Error: AuthForm component failed to load</div>;
  }
  
  if (typeof InputField !== 'function') {
    console.error('InputField is not a function:', InputField);
    return <div>Error: InputField component failed to load</div>;
  }
  
  if (typeof Button !== 'function') {
    console.error('Button is not a function:', Button);
    return <div>Error: Button component failed to load</div>;
  }

  return (
    <AuthForm 
      title="Sign in to your account"
      subtitle="Welcome back! Please sign in to continue."
    >
      <form onSubmit={handleSubmit} className="login-form" noValidate>
        <InputField
          type="text"
          name="username"
          label="Username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
          required
          icon={<span role="img" aria-label="user">👤</span>}  
        />
        
        <InputField
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
          icon={<span role="img" aria-label="lock">🔒</span>}  
        />
        
        <div className="form-options">
          <label htmlFor="rememberMe" className="remember-me">
            <input type="checkbox" id="rememberMe" name="rememberMe" />
            <span>Remember me</span>
          </label>
          <Link to="/forgot-password" className="forgot-password">
            Forgot password?
          </Link>
        </div>
        
        <Button
          type="submit"
          loading={loading}
          fullWidth
          size="large"
        >
          Sign In
        </Button>
        
        <div className="auth-switch">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="auth-link">
              Create account
            </Link>
          </p>
        </div>
      </form>
    </AuthForm>
  );
};

export default Login;