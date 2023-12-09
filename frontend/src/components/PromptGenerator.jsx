// PromptComponent.jsx
import React, { useState } from 'react';
import axios from 'axios';

const PromptComponent = ({ userToken }) => {
    const [generatedText, setGeneratedText] = useState('');
    const [error, setError] = useState('');

    // Include all the categories you want to offer
    const categories = [
        'sci-fi', 'fantasy', 'horror', 'mystery-thriller', 'romance', 
        'historical-fiction', 'adventure', 'dystopian', 'comedy', 
        'slice-of-life', 'non-fiction', 'poetry', 'character-development', 
        'dialogue-practice', 'setting-description', 
        'flash-fiction', 'world-building', 'first-person-perspective', 
        'plot-twists', 'genre-blending', 'emotional-writing'
    ];

    const handleCategoryClick = async (category) => {
        try {
            // Use axios to send a POST request with the category
            const response = await axios.post('http://localhost:8000/api/v1/generate-prompt/', {
                category: category,
                input: '' // Optional: Add user input if needed
            }, {
                headers: {
                    'Authorization': `Bearer ${userToken}` // Updated to use Bearer token
                }
            });

            setGeneratedText(response.data.generated_text);
        } catch (e) {
            setError('Failed to generate prompt: ' + (e.response?.data?.error || e.message));
        }
    };

    return (
        <div>
            <h2>Choose a Category</h2>
            <ul>
                {categories.map(category => (
                    <li key={category}>
                        <button onClick={() => handleCategoryClick(category)}>
                            {category.replace('-', ' ')} {/* Replace hyphens with spaces for display */}
                        </button>
                    </li>
                ))}
            </ul>

            {generatedText && <div><h3>Generated Prompt</h3><p>{generatedText}</p></div>}
            {error && <div><p>Error: {error}</p></div>}
        </div>
    );
};

export default PromptComponent;
