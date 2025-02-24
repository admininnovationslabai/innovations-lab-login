import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import logo from '../assets/innovations-lab-logo.png';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password, username) => {
    const errors = [];
    
    if (password.length < 8 || password.length > 16) {
      errors.push('Password must be between 8 and 16 characters');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    if (password.toLowerCase().includes(username.toLowerCase())) {
      errors.push('Password cannot contain username');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password requirements
    const passwordErrors = validatePassword(formData.password, formData.username);
    if (passwordErrors.length > 0) {
      setError(passwordErrors.join('\n'));
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://13.126.51.117:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful');
        setSuccess('Account created successfully!');
        // Clear form
        setFormData({
          username: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Failed to connect to the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginClick = () => {
    console.log('Navigating to login');
    navigate('/login');
  };

  return (
    <div className="register-container">
      <div className="company-header">
        <img src={logo} alt="Innovations Lab Logo" className="logo" />
      </div>
      <div className="register-box">
        <h2>Create Account</h2>
        
        {success && (
          <div className="success-message">
            {success}
          </div>
        )}
        
        {error && (
          <div className="error-message">
            {error.split('\n').map((err, index) => (
              <div key={index}>{err}</div>
            ))}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email or username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <div className="password-input">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <div className="password-input">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="password-requirements">
            <p>Password must:</p>
            <ul>
              <li>Be 8-16 characters long</li>
              <li>Include at least one uppercase letter</li>
              <li>Include at least one lowercase letter</li>
              <li>Include at least one number</li>
              <li>Include at least one special character</li>
              <li>Not contain your username</li>
            </ul>
          </div>

          <button 
            type="submit" 
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="login-link">
          <p>Already have an account?</p>
          <button 
            className="login-button"
            onClick={handleLoginClick}
            disabled={isLoading}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register; 