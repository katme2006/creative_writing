import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditResponse = ({ userToken }) => {
    const { responseId } = useParams(); // Get the response ID from the URL
    const navigate = useNavigate();
    const [promptText, setPromptText] = useState('');
    const [userResponse, setUserResponse] = useState('');
    const [title, setTitle] = useState('');

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

    useEffect(() => {
        const token = userToken || localStorage.getItem('token'); // Retrieve token from props or localStorage

        if (!token) {
            console.error("No token available");
            // Redirect to login or handle the lack of token as needed
        }

        const fetchResponseData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/write/individual-prompt/${responseId}/`, {
                    headers: { 'Authorization': `Token ${token}` }
                });
                setPromptText(response.data.prompt_text);
                setUserResponse(response.data.response_text);
                setTitle(response.data.title || ''); // Ensure title is set to an empty string if null
            } catch (error) {
                console.error('Error fetching response data:', error);
            }
        };

        fetchResponseData();
    }, [userToken, responseId]);

    const handleSaveChanges = async () => {
        const updatedData = {
            title: title || '', // Ensure title is not null
            prompt_text: promptText,
            response_text: userResponse
        };

        try {
            await axios.put(
                `http://localhost:8000/api/v1/write/individual-prompt/${responseId}/`,
                updatedData,
                { headers: { 'Authorization': `Token ${token}` } } // Use the token variable here
            );
            navigate(`/a-response-page/${responseId}`); // Navigate back to the response page
        } catch (error) {
            console.error('Error updating response:', error.response?.data || error.message);
        }
    };

    const handleBackClick = () => {
        navigate(`/a-response-page/${responseId}`); // Navigate back to the DisplaySubmittedPrompt component
    };

    return (
        <div>
            <h1>Edit Response</h1>
            <div>
                <h2>Prompt</h2>
                <p>{promptText}</p>
            </div>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={title || ''}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a title for your response"
                    style={{ width: '100%', marginBottom: '10px' }}
                />
                <ReactQuill
                    theme="snow"
                    value={userResponse}
                    onChange={setUserResponse}
                    placeholder="Edit your response here..."
                    modules={modules}
                    formats={formats}
                />
            </div>
            <button onClick={handleSaveChanges}>Save Changes</button>
            <button onClick={handleBackClick}>Back</button>
        </div>
    );
};

export default EditResponse;
