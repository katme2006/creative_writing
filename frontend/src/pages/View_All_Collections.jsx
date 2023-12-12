import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WritingCollectionsList = ({ userToken }) => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userToken) {
      const fetchCollections = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/v1/writing-collection/collections/', {
            headers: {
              'Authorization': `Token ${userToken}`,
            },
          });

          setCollections(response.data);
        } catch (err) {
          setError(err.response?.data?.detail || err.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCollections();
    }
  }, [userToken]);

  if (!userToken) {
    return <div>Please log in to view collections.</div>;
  }

  if (isLoading) {
    return <div>Loading collections...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>My Writing Collections</h1>
      <ul>
        {collections.map(collection => (
          <li key={collection.id}>
            <h3>{collection.collection_title}</h3>
            <p>{collection.collection_description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WritingCollectionsList;
