import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

const DisplaySubmittedPrompt = ({ userToken }) => {
    const { promptId } = useParams();
    const navigate = useNavigate();
    const [promptData, setPromptData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPromptData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/write/individual-prompt/${promptId}/`, {
                    headers: { 'Authorization': `Token ${userToken}` }
                });

                setPromptData(response.data);
                setIsLoading(false);
            } catch (err) {
                setError(`Failed to fetch prompt data: ${err}`);
                setIsLoading(false);
            }
        };

        if (promptId) {
            fetchPromptData();
        }
    }, [userToken, promptId]);

    const deletePrompt = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/write/individual-prompt/${promptId}/`, {
                headers: { 'Authorization': `Token ${userToken}` }
            });
            navigate('/'); // Navigate back to the homepage
        } catch (error) {
            console.error('Error deleting prompt:', error.response?.data || error.message);
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
                    <div>
                        <strong>Response Text:</strong>
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(promptData.response_text) }} />
                    </div>
                </div>
            )}
            <button onClick={deletePrompt}>Delete Prompt</button>
        </div>
    );
};

export default DisplaySubmittedPrompt;
