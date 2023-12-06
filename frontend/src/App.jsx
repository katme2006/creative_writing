import React, { useState, useEffect } from 'react';
import './App.css';
import Signup from './pages/Signup_Page';
import Login from './pages/Login_Page';
import LogoutButton from './components/LogoutButton';
import BioEditor from './components/BioForm';
import MyProfile from './pages/My_Profile_Page';
import EditProfilePage from './pages/EditProfilePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initialBio, setInitialBio] = useState('');
  const [userToken, setUserToken] = useState(null); // State for user token

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setUserToken(token); // Set the token in state
    }
  }, []);

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    setUserToken(token); // Update the token state on successful login
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserToken(null); // Clear the token state on logout
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
          <BioEditor userToken={userToken} initialBio={initialBio} />
          <MyProfile/>
          <EditProfilePage userToken={userToken} /> {/* Pass the token as a prop */}
        </>
      )}
    </div>
  );
}

export default App;
