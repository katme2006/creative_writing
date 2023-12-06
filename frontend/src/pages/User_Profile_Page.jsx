import React from 'react';
import BioEditor from '../components/BioForm';

const UserProfilePage = () => {
  // These values should come from your auth context or user state
  const userToken = 'user-auth-token';
  const userId = 'user-id';
  const initialBio = 'This is the initial bio content.';

  return (
    <div>
      <h1>Edit Your Bio</h1>
      <BioEditor 
        userToken={userToken} 
        userId={userId} 
        initialBio={initialBio} 
      />
    </div>
  );
};

export default UserProfilePage;
