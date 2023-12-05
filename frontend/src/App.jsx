import React, { useState, useEffect } from 'react';
import './App.css';
import Signup from './pages/Signup_Page';
import Login from './pages/Login_Page';
import LogoutButton from './components/LogoutButton';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.reload(); // or use your routing system to navigate
  };

  return (
    <div>
      {!isLoggedIn && <Signup onLoginSuccess={handleLoginSuccess} />}
      {!isLoggedIn && <Login onLoginSuccess={handleLoginSuccess} />}
      {isLoggedIn && <LogoutButton onLogout={handleLogout} />}
    </div>
  );
}

export default App;
