

import React, { useState } from 'react';
import './Login.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error display
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  
  
    try {
      await axios.post('http://localhost:5000/auth/login', { 
          email: email,
          password: password
      });
      navigate('/dashboard');
  } catch (error: any) {
      console.error('Login failed:', error);
    
      
        if (error.response) {
        
          setErrorMessage('Invalid email or password');
      } else if (error.request) {
       
        setErrorMessage('A network error occurred. Please try again later.');
      } else {
       
        setErrorMessage('An error occurred. Please try again later.');
      }
    }

    
  };

  return (
    <div className="viewport-wrapper">
      <div className="border-box">
        <img src={require('./Assets/auth.jpg')} alt="Background" className="background-image" />
        <div className="dark-overlay"></div> 
        <div className="login-container">
          <form className="login-form" onSubmit={handleLogin}>
            <h1>Login</h1>
            {/* Display Error Message: */}
            {errorMessage && <p className="error-message">{errorMessage}</p>} 
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FaEnvelope className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className="icon" />
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="/forgot-password">Forgot password?</a>
            </div>
            <button type="submit">Login</button>
            <div className="register-link">
              <p>Don't have an account? <a href="#" onClick={() => navigate('/register')}>Register</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
