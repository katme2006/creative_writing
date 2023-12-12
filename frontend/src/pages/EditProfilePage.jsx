import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BioEditor from '../components/BioForm';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = ({ userToken }) => {
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [interests, setInterests] = useState('');
  const [favoriteBooks, setFavoriteBooks] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/user_profile/my-profile/', {
          headers: {
            'Authorization': `Token ${userToken}`,
          },
        });

        const data = response.data;
        setBio(data.bio);
        setInterests(data.interests);
        setFavoriteBooks(data.favorite_books);
        if (data.profile_picture) {
          setProfilePicture(data.profile_picture);
        }
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
    if (profilePicture && typeof profilePicture === 'object') {
      formData.append('profile_picture', profilePicture);
    }
    formData.append('interests', interests);
    formData.append('favorite_books', favoriteBooks);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/user_profile/update-profile/', formData, {
        headers: {
          'Authorization': `Token ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Profile updated successfully');
        navigate('/my-profile');
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
        <BioEditor bio={bio} onBioChange={setBio} />

        <label htmlFor="profilePicture">Profile Picture:</label>
        <input type="file" id="profilePicture" onChange={handleProfilePictureChange} />
        
        <label htmlFor="interests">Interests:</label>
        <input 
          type="text" 
          id="interests" 
          value={interests} 
          onChange={(event) => setInterests(event.target.value)} 
          placeholder="Interests" 
        />

        <label htmlFor="favoriteBooks">Favorite Books:</label>
        <input 
          type="text" 
          id="favoriteBooks" 
          value={favoriteBooks} 
          onChange={(event) => setFavoriteBooks(event.target.value)} 
          placeholder="Favorite Books" 
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfilePage;
