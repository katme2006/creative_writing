import React, { useState } from 'react';
import axios from 'axios';

const CollectionCreateForm = ({ userToken }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/writing-collection/create/',
        {
          collection_title: title,
          collection_description: description,
        },
        {
          headers: { Authorization: `Token ${userToken}` },
        }
      );
      console.log('Collection created:', response.data);
      // Handle successful creation (e.g., redirect or clear form)
    } catch (error) {
      console.error('Error creating collection:', error);
      // Handle errors (e.g., show error message)
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
