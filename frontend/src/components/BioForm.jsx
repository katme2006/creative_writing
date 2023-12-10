import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import axios from 'axios'; 

const BioEditor = ({ userToken, initialBio }) => {
  const [bio, setBio] = useState('');

  useEffect(() => {
    setBio(initialBio);
  }, [initialBio]);

  const modules = {
    toolbar: [
      [{ 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      [],
      ['clean']
    ],
    clipboard: {
      // Toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  };

  // Formats objects for setting up what to include in the toolbar
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
  ];

  const handleBioChange = (content, delta, source, editor) => {
    setBio(editor.getHTML());
  };

  const saveBio = async () => {
    try {
      // Sanitize the bio content before sending it
      const cleanBio = DOMPurify.sanitize(bio);

      const response = await axios.post('http://localhost:8000/api/v1/user_profile/update-profile/', 
        { bio: cleanBio }, 
        { 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${userToken}`,
          }
        }
      );

      alert('Bio updated successfully');
    } catch (error) {
      if (error.response) {
        // Handle error response from server
        console.error('Error:', error.response.data);
        alert(`Failed to update bio: ${error.response.data.detail || 'Unknown error'}`);
      } else {
      
        console.error('Network error:', error);
        alert('Error updating bio');
      }
    }
  };

  return (
    <div>
      <ReactQuill
        value={bio}
        modules={modules}
        formats={formats}
        onChange={handleBioChange}
        theme="snow"
      />
      <button onClick={saveBio}>Save Bio</button>
    </div>
  );
};

export default BioEditor;
