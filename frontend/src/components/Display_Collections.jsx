import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Display_Collections.css';

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

  // Function to create groups of 5 collections
  const chunk = (arr, size) =>
    arr.reduce((acc, val, i) => {
      let idx = Math.floor(i / size);
      let page = acc[idx] || (acc[idx] = []);
      page.push(val);
      return acc;
    }, []);

  const groupedCollections = chunk(collections, 4);

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
  
  
        <div class="container-with-arrows">
          <div class="arrow left-arrow">←</div>
          <div class="d-flex flex-wrap justify-content-start">
          {collections.map(collection => (
          <Card key={collection.id} style={{ width: '18rem' }} className="m-2">
            <Card.Body>
              <Card.Title>{collection.collection_title}</Card.Title>
              <Card.Text>{collection.collection_description}</Card.Text>
              <Link to={`/collection/${collection.id}`} className="btn btn-primary">
                View Collection
              </Link>
            </Card.Body>
          </Card>
        ))}

          </div>
          <div class="arrow right-arrow">→</div>
        </div>
   
      <Link to="/create-collection" className="btn btn-success mt-3">Create New Collection</Link>
      <Link to="/all-collections" className="btn btn-info mt-3">View All Collections</Link>
    </div>
  );
};

export default RecentCollectionsList;