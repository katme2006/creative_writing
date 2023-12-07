import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup_Page'; // Assuming this is the correct path to your Signup component
import Login from './pages/Login_Page';
import MyProfile from './pages/My_Profile_Page';
import EditProfilePage from './pages/EditProfilePage';

const AppRouter = ({ isLoggedIn, userToken, onLoginSuccess, onSignupSuccess, onLogout }) => {
    return (
        <Routes>
          <Route path="/" element={<HomePage />} />
          {!isLoggedIn && (
            <>
              <Route path="/signup" element={<Signup onSignupSuccess={onSignupSuccess} />} />
              <Route path="/login" element={<Login onLoginSuccess={onLoginSuccess} />} />
            </>
          )}
          {isLoggedIn && (
            <>
              <Route path="/my-profile" element={<MyProfile userToken={userToken} />} />
              <Route path="/edit-profile" element={<EditProfilePage userToken={userToken} />} />
            </>
          )}
        </Routes>
      );
    };

export default AppRouter;
