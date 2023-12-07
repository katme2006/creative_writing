// NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../pages/Login_Page';
import Signup from '../pages/Signup_Page';
import LogoutButton from '../components/LogoutButton';

const NavBar = ({ isLoggedIn, onLogout, userEmail,onSignupSuccess }) => {
  return (
    <div>
      <h1>This is a navbar hooray</h1>
      {!isLoggedIn ? (
        <>
          <Login />
          <Signup onSignupSuccess={onSignupSuccess} />
        </>
      ) : (
        <>
          <span>{userEmail}</span> 
          <Link to="/my-profile">My Profile</Link>
          <LogoutButton onLogout={onLogout} />
        </>
      )}
    </div>
  );
};

export default NavBar;
