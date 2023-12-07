import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppRouter from './router';
import NavBar from './components/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userEmail, setUserEmail] = useState(''); 

  useEffect(() => {
    // Check for token and email in local storage
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token) {
      setIsLoggedIn(true);
      setUserToken(token);
    }
    if (email) {
      setUserEmail(email); 
    }
  }, []);

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