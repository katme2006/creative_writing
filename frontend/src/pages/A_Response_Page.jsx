import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

const DisplaySubmittedPrompt = ({ userToken }) => {
    const { promptId } = useParams();
    const navigate = useNavigate();
    const [promptData, setPromptData] = useState(null);
    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch the prompt data
    useEffect(() => {
        const fetchPromptData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/write/individual-prompt/${promptId}/`, {
                    headers: { 'Authorization': `Token ${userToken}` }
                });
                setPromptData(response.data);
            } catch (err) {
                setError(`Failed to fetch prompt data: ${err}`);
            } finally {
                setIsLoading(false);
            }
        };

        // Fetch the user's writing collections
        const fetchCollections = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/writing-collection/collections/', {
                    headers: { 'Authorization': `Token ${userToken}` }
                });
                setCollections(response.data);
            } catch (err) {
                console.error('Error fetching collections:', err);
            }
        };

        if (promptId) {
            fetchPromptData();
            fetchCollections();
        }
    }, [userToken, promptId]);

    // Delete the current prompt
    const deletePrompt = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/write/individual-prompt/${promptId}/`, {
                headers: { 'Authorization': `Token ${userToken}` }
            });
            navigate('/');
        } catch (error) {
            console.error('Error deleting prompt:', error.response?.data || error.message);
        }
    };

    // Navigate to the edit response page
    const handleEditClick = () => {
        navigate(`/edit-response/${promptId}`);
    };

    // Handle adding the prompt to a collection
    const handleAddToCollection = async () => {
        if (!selectedCollection) {
            alert('Please select a collection.');
            return;
        }
        try {
            await axios.put(`http://localhost:8000/api/v1/write/add-to-collection/${promptId}/`, 
                { collection_id: selectedCollection },
                { headers: { 'Authorization': `Token ${userToken}` } }
            );
            alert('Prompt added to collection successfully');
        } catch (error) {
            console.error('Error adding to collection:', error.response?.data || error.message);
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
            <h2>Submitted Prompt Details</h2>
            {promptData && (
                <div>
                    <p><strong>Prompt Text:</strong> {promptData.prompt_text}</p>
                    <div><strong>Response Text:</strong>
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(promptData.response_text) }} />
                    </div>
                </div>
            )}
            <button onClick={deletePrompt}>Delete Prompt</button>
            <button onClick={handleEditClick}>Edit</button>

            <div>
                <h3>Add to Collection:</h3>
                <select value={selectedCollection} onChange={(e) => setSelectedCollection(e.target.value)}>
                    <option value="">Select a Collection</option>
                    {collections.map((collection) => (
                        <option key={collection.id} value={collection.id}>
                            {collection.collection_title}
                        </option>
                    ))}
                </select>
                <button onClick={handleAddToCollection}>Add to Collection</button>
            </div>
        </div>
    );
};

export default DisplaySubmittedPrompt;
