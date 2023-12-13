import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

const CollectionDetail = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollection = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not logged in or token not found");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/writing-collection/collection/${collectionId}/`,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        setCollection(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || err.message);
      }
    };

    fetchCollection();
  }, [collectionId]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!collection) {
    return <div>Loading...</div>;
  }

  const handleDeleteCollection = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this collection?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:8000/api/v1/writing-collection/collection/delete/${collectionId}/`,
        {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        }
      );
      navigate("/"); // Redirect to the homepage or another appropriate page
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "An error occurred while deleting the collection"
      );
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!collection) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{collection.collection_title}</h2>
      <p>{collection.collection_description}</p>
      <p>Created on: {formatDate(collection.created_at)}</p>
      <p>Last updated: {formatDate(collection.updated_at)}</p>

      <Link
        to={`/edit-collection/${collectionId}`}
        className="edit-collection-btn"
      >
        Edit Collection
      </Link>
      <button
        onClick={handleDeleteCollection}
        className="delete-collection-btn"
      >
        Delete Collection
      </button>

      <h3>Responses in this Collection:</h3>
      <ul>
        {collection.prompts.map((prompt) => (
          <li key={prompt.id}>
            <Link to={`/prompt/${prompt.id}`}>
              {prompt.title || prompt.prompt_text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionDetail;
