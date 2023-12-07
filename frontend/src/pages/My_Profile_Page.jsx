import React, { useState, useEffect } from 'react';
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
        const response = await fetch('http://localhost:8000/api/v1/user_profile/my-profile/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        setError(err.message);
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
    {profile_picture && <img src={profile_picture} alt="Profile" />}
    <div dangerouslySetInnerHTML={{ __html: sanitizedBio }} />
    <p><strong>Interests:</strong> {interests || 'Not specified'}</p>
    <p><strong>Favorite Books:</strong> {favorite_books || 'Not specified'}</p>

    <Link to="/edit-profile">Edit Profile</Link>
  </div>
  );
};

export default MyProfile;
