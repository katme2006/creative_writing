import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppRouter from './router';
import NavBar from './components/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  // Check for token and email in local storage and set up Axios interceptor
  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token) {
      setIsLoggedIn(true);
      setUserToken(token);
    }
    if (email) {
      setUserEmail(email);
    }

    // Axios interceptor to add authorization header
    const axiosInterceptor = axios.interceptors.request.use(config => {
      if (token) {
        config.headers.Authorization = `Token ${token}`;
      } else {
        delete config.headers.Authorization;
      }
      return config;
    });

    // Cleanup function to remove interceptor
    return () => {
      axios.interceptors.request.eject(axiosInterceptor);
    };
  }, [userToken]);

  const handleLoginSuccess = (token, email) => {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    setIsLoggedIn(true);
    setUserToken(token);
    setUserEmail(email);
  };

  const handleSignupSuccess = (token, email) => {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    setIsLoggedIn(true);
    setUserToken(token);
    setUserEmail(email);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    setUserToken(null);
    setUserEmail('');
  };

  return (
    <Router>
      <NavBar 
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        onLogout={handleLogout}
        onSignupSuccess={handleSignupSuccess} 
        onLoginSuccess={handleLoginSuccess}
      />
     
      <AppRouter 
        isLoggedIn={isLoggedIn}
        userToken={userToken}
        userEmail={userEmail}
        onLoginSuccess={handleLoginSuccess}
        onSignupSuccess={handleSignupSuccess} 
        onLogout={handleLogout}
      />
    </Router>
  );
}

export default App;
