import React, { useState, useEffect } from 'react';
import BioEditor from '../components/BioForm';

const EditProfilePage = ({ userToken }) => {
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [interests, setInterests] = useState('');
  const [favoriteBooks, setFavoriteBooks] = useState('');

  useEffect(() => {
    // Fetch the user's profile data
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/user_profile/my-profile/', {
          headers: {
            'Authorization': `Token ${userToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setBio(data.bio);
        setInterests(data.interests);
        setFavoriteBooks(data.favorite_books);
        // Note: We cannot set the profile picture file here
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [userToken]);

  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('bio', bio);
    if (profilePicture) {
      formData.append('profile_picture', profilePicture);
    }
    formData.append('interests', interests);
    formData.append('favorite_books', favoriteBooks);

    try {
      const response = await fetch('http://localhost:8000/api/v1/user_profile/update-profile/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${userToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert('Profile updated successfully');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating profile');
    }
  };

  return (
    <div>
   <h1>Edit My Profile</h1>
  <form onSubmit={handleSubmit}>
    <BioEditor userToken={userToken} initialBio={bio} />
    
    {/* Label for Profile Picture */}
    <label htmlFor="profilePicture">Profile Picture:</label>
    <input type="file" id="profilePicture" onChange={handleProfilePictureChange} />

    {/* Label for Interests */}
    <label htmlFor="interests">Interests:</label>
    <input 
      type="text" 
      id="interests" 
      value={interests} 
      onChange={(e) => setInterests(e.target.value)} 
      placeholder="Interests" 
    />

    {/* Label for Favorite Books */}
    <label htmlFor="favoriteBooks">Favorite Books:</label>
    <input 
      type="text" 
      id="favoriteBooks" 
      value={favoriteBooks} 
      onChange={(e) => setFavoriteBooks(e.target.value)} 
      placeholder="Favorite Books" 
    />

    <button type="submit">Save Changes</button>
  </form>
    </div>
  );
};

export default EditProfilePage;
