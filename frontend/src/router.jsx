// In AppRouter.jsx
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Signup from './pages/Signup_Page';
import Login from './pages/Login_Page';
import MyProfile from './pages/My_Profile_Page';
import EditProfilePage from './pages/EditProfilePage'; // Assume you have this component

const AppRouter = ({ isLoggedIn, onLoginSuccess, onLogout }) => {
  return (
    <Switch>
      {!isLoggedIn ? (
        <>
          <Route path="/signup" render={() => <Signup onSignupSuccess={onLoginSuccess} />} />
          <Route path="/login" render={() => <Login onLoginSuccess={onLoginSuccess} />} />
          {/* Add routes for public components */}
        </>
      ) : (
        <>
          <Route path="/my-profile" component={MyProfile} />
          <Route path="/edit-profile" component={EditProfilePage} />
          {/* Add routes for protected components */}
          {/* Logout functionality can be integrated into the Navbar or Header component */}
        </>
      )}
      {/* Add a default route for home or a 404 page */}
    </Switch>
  );
};

export default AppRouter;
