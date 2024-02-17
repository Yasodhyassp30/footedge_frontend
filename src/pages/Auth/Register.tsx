


import React, { useState } from 'react';
import './Login.css'; // Assuming shared styles
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios'

interface RegistrationResponseData {
  message: string;
  error?: string; // Make the 'error' property optional
}

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setErrorMessage(''); // Clear past errors on transition
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(''); //  Reset previous error state for each new try

    if (isRegistering) {
      await handleRegister();
    } else {
      await handleLogin();
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      return setErrorMessage('Passwords do not match');
    }

    try {
      const response: AxiosResponse<RegistrationResponseData> = await axios.post(
        '/auth/register', // Use '/register' if changed path on backend
        {
          email: email,
          password: password,
        }
      );

      if (response.status === 201) {
        navigate('/login'); // Navigate upon successful registration
        console.log('Registration Success:', response.data.message);
      } else {
        setErrorMessage(response.data?.error || 'Registration failed. Please try again.');
         console.log('Registration Error (Frontend Response):', response); 
        
      }
    } catch (error: any) {
      console.error('Registration failed:', error);

      if (error.response) {
        setErrorMessage(
          error.response.data?.error || 'Registration failed. Please try again later.'
        );
      } else if (error.request) {
        setErrorMessage('Network error occurred. Please try again later.');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  const handleLogin = async () => {
    try {
      const response: AxiosResponse<{ token: string }> = await axios.post(
        '/login', // Adjust backend route as needed
        {
          email: email,
          password: password,
        }
      );

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token); 
        navigate('/'); // Navigate on successful login
      } else {
        setErrorMessage('Invalid email or password'); // Generic error for security
      }
    } catch (error: any) {
      console.error('Login failed:', error);

      if (error.response) {
        setErrorMessage('this error'); // Generic message
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
        <img
          src={require('./Assets/auth.jpg')}
          alt="Background"
          className="background-image"
        />
        <div className="dark-overlay"></div>
        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1>{isRegistering ? 'Register' : 'Login'}</h1> 
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
            {isRegistering && ( // Conditional rendering of Confirm Password
              <div className="input-box"> 
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <FaLock className="icon" /> 
              </div>
            )}

            <button type="submit">
              {isRegistering ? 'Register' : 'Login'} 
            </button>

            <div className="register-link"> 
              <p>
                {isRegistering ? 'Already have an account? ' : "Don't have an account? "} 
                <a href="#" onClick={toggleMode}>
                  {isRegistering ? 'Login' : 'Register'} 
                </a>
              </p>
            </div>
          </form>
        </div> 
      </div>
    </div>
  );
};

export default Register;