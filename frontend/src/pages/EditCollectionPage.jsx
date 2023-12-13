import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCollectionPage = () => {
    const { collectionId } = useParams();
    const navigate = useNavigate();
    const [collectionTitle, setCollectionTitle] = useState('');
    const [collectionDescription, setCollectionDescription] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('User not logged in or token not found');
            return;
        }

        const fetchCollection = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/writing-collection/collection/${collectionId}/`, {
                    headers: { 'Authorization': `Token ${token}` }
                });
                setCollectionTitle(response.data.collection_title);
                setCollectionDescription(response.data.collection_description);
                setIsLoading(false);
            } catch (err) {
                setError(err.response?.data?.detail || err.message);
                setIsLoading(false);
            }
        };

        fetchCollection();
    }, [collectionId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await axios.put(`http://localhost:8000/api/v1/writing-collection/collection/${collectionId}/update/`, {
                collection_title: collectionTitle,
                collection_description: collectionDescription
            }, {
                headers: { 'Authorization': `Token ${token}` }
            });
            navigate(`/collection/${collectionId}`);
        } catch (err) {
            setError(err.response?.data?.detail || err.message);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Edit Collection</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        id="title"
                        type="text"
                        value={collectionTitle}
                        onChange={(e) => setCollectionTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={collectionDescription}
                        onChange={(e) => setCollectionDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditCollectionPage;
