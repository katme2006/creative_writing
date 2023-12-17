import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/PromptComponentStyles.css';

const PromptComponent = ({ userToken }) => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('');

    const categories = [
        'sci-fi', 'fantasy', 'horror', 'mystery-thriller', 'romance',
        'historical-fiction', 'adventure', 'dystopian', 'comedy',
        'slice-of-life', 'non-fiction', 'poetry', 'character-development',
        'dialogue-practice', 'setting-description',
        'flash-fiction', 'world-building', 'first-person-perspective',
        'plot-twists', 'genre-blending', 'emotional-writing'
    ];

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleGeneratePrompt = async () => {
        if (selectedCategory) {
            try {
                const response = await axios.post('http://localhost:8000/api/v1/generate-prompt/', {
                    category: selectedCategory
                }, {
                    headers: { 'Authorization': `Bearer ${userToken}` }
                });

                navigate('/display-prompt', { state: { generatedText: response.data.generated_text, category: selectedCategory } });
            } catch (e) {
                console.error('Failed to generate prompt:', e.response ? e.response.data ? e.response.data.error : e.response : e.message);
            }
        } else {
            alert('Please select a category first.');
        }
    };

    return (
        <div>
            <h2>Choose a Category</h2>
            <div className='category-box'>
                {categories.map(category => (
                    <div key={category} 
                         className={`category-item ${selectedCategory === category ? 'selected-category' : ''}`} 
                         onClick={() => handleCategorySelect(category)}>
                        {category.replace('-', ' ')}
                    </div>
                ))}
            </div>
            <button onClick={handleGeneratePrompt} className="generate-prompt-button">
                Generate Prompt
            </button>
        </div>
    );
};

export default PromptComponent;
