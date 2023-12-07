import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppRouter from './router';
import NavBar from './components/Navbar';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userEmail, setUserEmail] = useState(''); // Added state for userEmail

  useEffect(() => {
    // Check for token and email in local storage
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token) {
      setIsLoggedIn(true);
      setUserToken(token);
    }
    if (email) {
      setUserEmail(email); // Set userEmail if available
    }
  }, []);

  const handleLoginSuccess = (token, email) => {
    // Store token and email in local storage
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    // Update state
    setIsLoggedIn(true);
    setUserToken(token);
    setUserEmail(email); // Set userEmail state
  };

  const handleSignupSuccess = (token, email) => {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    setIsLoggedIn(true);
    setUserToken(token);
    setUserEmail(email); // Update userEmail state
  };

  const handleLogout = () => {
    // Clear local storage and state
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    setUserToken(null);
    setUserEmail(''); // Clear userEmail state
  };

  return (
    <Router>
         <NavBar 
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        onLogout={handleLogout}
        onSignupSuccess={handleSignupSuccess} // Pass the onSignupSuccess function
      />
      <AppRouter 
        isLoggedIn={isLoggedIn}
        userToken={userToken}
        userEmail={userEmail}
        onLoginSuccess={handleLoginSuccess}
        onSignupSuccess={handleSignupSuccess} // Ensure this is passed down
        onLogout={handleLogout}
      />
    </Router>
  );
}

export default App;