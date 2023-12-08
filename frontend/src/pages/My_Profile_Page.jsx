import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';

const MyProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not logged in');
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/v1/user_profile/my-profile/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        setProfileData(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const { bio, profile_picture, interests, favorite_books } = profileData;
  const sanitizedBio = bio ? DOMPurify.sanitize(bio) : 'No bio available';

  return (
    <div>
      <h1>My Profile</h1>
      {profile_picture && <img src={profile_picture} alt="Profile" style={{ width: '100px', height: 'auto' }} />}
      <div dangerouslySetInnerHTML={{ __html: sanitizedBio }} />
      <p><strong>Interests:</strong> {interests || 'Not specified'}</p>
      <p><strong>Favorite Books:</strong> {favorite_books || 'Not specified'}</p>
      <Link to="/edit-profile">Edit Profile</Link>
    </div>
  );
};

export default MyProfile;
