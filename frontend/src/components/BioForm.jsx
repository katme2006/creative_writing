import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';

const BioEditor = ({ userToken, initialBio }) => {
  const [bio, setBio] = useState('');

  useEffect(() => {
    setBio(initialBio);
  }, [initialBio]);

  const handleBioChange = (content, delta, source, editor) => {
    setBio(editor.getHTML());
  };

  const saveBio = async () => {
    try {
      // Sanitize the bio content before sending it
      const cleanBio = DOMPurify.sanitize(bio);

      const response = await fetch('http://localhost:8000/api/v1/user_profile/update-profile/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${userToken}`,
        },
        body: JSON.stringify({ bio: cleanBio }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Bio updated successfully');
      } else {
        // Handle non-200 responses
        try {
          const errorData = await response.json();
          alert(`Failed to update bio: ${errorData.detail || 'Unknown error'}`);
        } catch (jsonError) {
          // This block handles cases where the response is not in JSON format
          const text = await response.text();
          console.error('Response not JSON:', text);
          alert('Failed to update bio: The server responded with a non-JSON reply');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating bio');
    }
  };

  return (
    <div>
      <ReactQuill
        value={bio}
        onChange={handleBioChange}
        theme="snow"
      />
      <button onClick={saveBio}>Save Bio</button>
    </div>
  );
};

export default BioEditor;
