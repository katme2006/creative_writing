import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CollectionCreateForm = ({ userToken }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/writing-collection/create/',
        { collection_title: title, collection_description: description },
        { headers: { Authorization: `Token ${userToken}` } }
      );
      console.log('Collection created:', response.data);
      // Navigate to the new collection's detail page
      navigate(`/collection/${response.data.id}`);
    } catch (error) {
      console.error('Error creating collection:', error);

    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Collection Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Collection Description"
      />
      <button type="submit">Create Collection</button>
    </form>
  );
};

export default CollectionCreateForm;
