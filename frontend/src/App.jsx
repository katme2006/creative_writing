import React, { useState, useEffect } from 'react';
import './App.css';
import Signup from './pages/Signup_Page';
import Login from './pages/Login_Page';
import LogoutButton from './components/LogoutButton';
import BioEditor from './components/BioForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initialBio, setInitialBio] = useState('');
  // You might want to fetch the initial bio from the backend when the user logs in

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    // If you need to fetch the initial bio on app load, do it here
  }, []);

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    // Here you can fetch the user's bio after they log in and set it with setInitialBio
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <>
          <Signup onSignupSuccess={handleLoginSuccess} />
          <Login onLoginSuccess={handleLoginSuccess} />
        </>
      ) : (
        <>
          <LogoutButton onLogout={handleLogout} />
          <BioEditor userToken={localStorage.getItem('token')} initialBio={initialBio} />
        </>
      )}
    </div>
  );
}

export default App;
