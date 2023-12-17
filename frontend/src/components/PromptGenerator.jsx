// PromptComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/PromptComponentStyles.css'

const PromptComponent = ({ userToken }) => {
    const navigate = useNavigate();
    const location = useLocation();
    // Initialize showCategories based on the state passed in navigation
    const [showCategories, setShowCategories] = useState(location.state?.showCategories || false);

    const categories = [
        'sci-fi', 'fantasy', 'horror', 'mystery-thriller', 'romance',
        'historical-fiction', 'adventure', 'dystopian', 'comedy',
        'slice-of-life', 'non-fiction', 'poetry', 'character-development',
        'dialogue-practice', 'setting-description',
        'flash-fiction', 'world-building', 'first-person-perspective',
        'plot-twists', 'genre-blending', 'emotional-writing'
    ];

    useEffect(() => {
        // If the state includes showCategories, update it accordingly
        if (location.state?.showCategories) {
            setShowCategories(true);
        }
    }, [location.state]);

    const handleCategoryClick = async (category) => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/generate-prompt/', {
                category: category,
                input: ''  // Optional: Add user input if needed
            }, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            });

            // Navigate to the DisplayPrompt page with the generated text and category
            navigate('/display-prompt', { state: { generatedText: response.data.generated_text, category: category } });
        } catch (e) {
            console.error('Failed to generate prompt:', e.response?.data?.error || e.message);
        }
    };



     return (
        <div>
            <h2>Choose a Category</h2>
            <div className='category-box'>
                {!showCategories ? (
                    <div className="category-item" onClick={() => setShowCategories(true)}>Generate a Prompt</div>
                ) : (
                    categories.map(category => (
                        <div key={category} className="category-item" onClick={() => handleCategoryClick(category)}>
                            {category.replace('-', ' ').toUpperCase()}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PromptComponent;