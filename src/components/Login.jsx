import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';


const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    console.log('Login attempt started for username:', credentials.username);
    console.log('Making request to:', 'https://e8hrtu0c1c.execute-api.ap-south-1.amazonaws.com/api/login');

    try {
      console.log('Request headers:', {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });

      const response = await fetch('https://e8hrtu0c1c.execute-api.ap-south-1.amazonaws.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password
        })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      const data = await response.json();
      console.log('Response data:', { ...data, access_token: '[REDACTED]' });

      if (response.ok && data.message === "Login successful") {
        console.log('Login successful, storing tokens');
        // Store tokens in localStorage
        if (data.access_token) {
          localStorage.setItem('access_token', data.access_token);
        }
        if (data.id_token) {
          localStorage.setItem('id_token', data.id_token);
        }
        if (data.refresh_token) {
          localStorage.setItem('refresh_token', data.refresh_token);
        }
        
        console.log('Navigating to home page');
        navigate('/home');
      } else {
        console.error('Login failed:', data.message);
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error details:', {
        message: err.message,
        stack: err.stack,
        name: err.name
      });
      setError('Failed to connect to the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateAccount = () => {
    console.log('Attempting navigation to register');
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="company-header">
        <img src="/images/innovations-lab-logo.png" alt="Innovations Lab Logo" className="logo" />
      </div>
      <div className="login-box">
        <h2>Log in</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email or username</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
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
                value={credentials.password}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
              <span className="password-toggle">👁</span>
            </div>
          </div>
          
          <button 
            type="button" 
            className="forgot-password-button"
            onClick={() => console.log('Forgot password clicked')}
            disabled={isLoading}
          >
            Forgot password
          </button>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <div className="create-account">
          <p>No account?</p>
          <button 
            type="button"
            className="create-account-button"
            onClick={handleCreateAccount}
            disabled={isLoading}
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login; 
