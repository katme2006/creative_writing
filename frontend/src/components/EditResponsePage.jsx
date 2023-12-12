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

    // Function to fetch the response data from the server
    useEffect(() => {
        const fetchResponseData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/write/individual-prompt/${responseId}/`, {
                    headers: { 'Authorization': `Token ${userToken}` }
                });
                setPromptText(response.data.prompt_text);
                setUserResponse(response.data.response_text);
                setTitle(response.data.title);
            } catch (error) {
                console.error('Error fetching response data:', error);
            }
        };

        fetchResponseData();
    }, [userToken, responseId]);

    // Function to handle saving changes to the response
    const handleSaveChanges = async () => {
        const updatedData = {
            title: title || '', // Ensure title is not null - it got mad if there was no value
            prompt_text: promptText,
            response_text: userResponse
        };

        try {
            await axios.put(
                `http://localhost:8000/api/v1/write/individual-prompt/${responseId}/`,
                updatedData,
                { headers: { 'Authorization': `Token ${userToken}` } }
            );
            navigate(`/a-response-page/${responseId}`); // Go back
        } catch (error) {
            console.error('Error updating response:', error.response?.data || error.message);
        }
    };

    // Function to navigate back to the display prompt page
    const handleBackClick = () => {
        navigate(`/a-response-page/${responseId}`);
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
                    value={title || ''} // fallback to an empty string if title is null
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
