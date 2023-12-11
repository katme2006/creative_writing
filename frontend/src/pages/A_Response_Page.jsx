import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DisplaySubmittedPrompt = ({ userToken }) => {

    const { promptId } = useParams();
    const [promptData, setPromptData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Function to fetch the prompt data from the backend
        const fetchPromptData = async () => {
            try {
                // Making a GET request to the backend to get the prompt data
                const response = await axios.get(`http://localhost:8000/api/v1/write/individual-prompt/${promptId}/`, {
                    headers: { 'Authorization': `Bearer ${userToken}` }
                });

                // Setting the fetched data to state
                setPromptData(response.data);
                setIsLoading(false);
            } catch (err) {
              
                setError(`Failed to fetch prompt data: ${err}`);
                setIsLoading(false);
            }
        };

        // Calling the fetch function if promptId is available
        if (promptId) {
            fetchPromptData();
        }
    }, [userToken, promptId]); // Dependencies for the useEffect hook

    // Display a loading message while data is being fetched
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Display an error message if there was an error fetching data
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Rendering the fetched prompt and response data
    return (
        <div>
            <h2>Submitted Prompt Details</h2>
            {promptData && (
                <div>
                    <p><strong>Prompt Text:</strong> {promptData.prompt_text}</p>
                    <p><strong>Response Text:</strong> {promptData.response_text}</p>
                    {/* Figure out how much info you want to display/how you want to display it */}
                </div>
            )}
        </div>
    );
};

export default DisplaySubmittedPrompt;
