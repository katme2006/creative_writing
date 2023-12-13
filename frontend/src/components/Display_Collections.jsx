import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

const RecentCollectionsList = ({ userToken }) => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userToken) {
      const fetchRecentCollections = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/v1/writing-collection/collections/recent/', {
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

      fetchRecentCollections();
    }
  }, [userToken]);

  if (!userToken) {
    return <div></div>;
  }

  if (isLoading) {
    return <div>Loading recent collections...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>My Recent Writing Collections</h1>
      <ul>
        {collections.map(collection => (
          <li key={collection.id}>
            <Link to={`/collection/${collection.id}`}>
              <h3>{collection.collection_title}</h3>
              <p>{collection.collection_description}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/create-collection" className="create-new-collection-btn">Create New Collection</Link>
      <Link to="/all-collections" className="view-all-collections-btn">View All Collections</Link>
    </div>
  );
};

export default RecentCollectionsList;
