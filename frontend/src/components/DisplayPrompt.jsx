// DisplayPrompt.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DisplayPrompt = ({ userToken }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { generatedText, category } = location.state || { generatedText: 'No prompt generated.', category: null };

    const regeneratePrompt = async () => {
        if (category) {
            try {
                const response = await axios.post('http://localhost:8000/api/v1/generate-prompt/', {
                    category: category,
                    input: '' // Optional: Add user input if needed
                }, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                });

                // Update the page with new prompt
                navigate('/display-prompt', { state: { generatedText: response.data.generated_text, category } });
            } catch (e) {
                console.error('Failed to regenerate prompt:', e.response?.data?.error || e.message);
            }
        } else {
            console.error('Category not available for regenerating prompt.');
        }
    };

    const goBackToPromptList = () => {
        navigate('/prompt-generator'); 
    };

    return (
        <div>
            <h1>Writing Prompt</h1>
            <p>{generatedText}</p>
            <button onClick={regeneratePrompt}>Regenerate Prompt</button>
            <button onClick={goBackToPromptList}>Back to Prompt List</button>
        </div>
    );
};

export default DisplayPrompt;
