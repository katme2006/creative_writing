import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const DisplayPromptWithResponse = ({ userToken }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { generatedText, category } = location.state || { generatedText: 'No prompt generated.', category: null };
    const [userResponse, setUserResponse] = useState('');

    // Configuration for ReactQuill toolbar
    const modules = {
        toolbar: [
            [{ 'font': [] }],
            [{ 'size': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [],
            ['clean']
        ],
        clipboard: {
            matchVisual: false,
        }
    };

    // Formatting options for ReactQuill
    const formats = [
        'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent'
    ];

    // Function to regenerate prompt
    const regeneratePrompt = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/generate-prompt/', {
                category: category
            }, {
                headers: { 'Authorization': `Bearer ${userToken}` }
            });

            navigate('/display-prompt', { replace: true, state: { generatedText: response.data.generated_text, category: category } });
        } catch (error) {
            console.error('Error regenerating prompt:', error.response?.data?.error || error.message);
        }
    };

    // Function to handle submission of the response
    const handleSubmitResponse = async () => {
        const promptData = {
            prompt_text: generatedText,
            response_text: userResponse,
            is_timed: false, // Assume is_timed is false for simplicity
            time_taken: null, // Logic for this is not implemented
            genre: category // Assuming 'category' maps to 'genre' in your model
        };
    
        try {
            const response = await axios.post(
                'http://localhost:8000/api/v1/write/create/',
                promptData,
                { headers: { 'Authorization': `Bearer ${userToken}` } }
            );
    
            // Log the entire response object - figure out what's breaking here
            console.log('Response from server:', response);
            console.log('Data received:', response.data);
    
            if (response.status === 201) {
                console.log('Response saved successfully');
                navigate(`/a-response-page/${response.data.id}`);
            } else {
                console.error('Failed to save the response');
            }
        } catch (error) {
            console.error('Error saving response:', error.response?.data || error.message);
        }
    };

    return (
        <div>
            <div>
                <h1>Writing Prompt</h1>
                <p>{generatedText}</p>
            </div>
            <div style={{ marginBottom: '20px' }}>
                <button onClick={regeneratePrompt}>Regenerate Prompt</button>
                <ReactQuill
                    theme="snow"
                    value={userResponse}
                    onChange={setUserResponse}
                    placeholder="Write your response here..."
                    modules={modules}
                    formats={formats}
                />
            </div>
            <button onClick={handleSubmitResponse}>Save</button>
        </div>
    );
};

export default DisplayPromptWithResponse;
