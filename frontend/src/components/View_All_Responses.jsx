import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

const ViewAllResponses = ({ userToken }) => {
    const [responses, setResponses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Function to strip HTML and get plain text
    const stripHtml = (html) => {
        const cleanText = DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
        return cleanText;
    };

    useEffect(() => {
        if (userToken) {
            const fetchResponses = async () => {
                try {
                    const response = await axios.get('http://localhost:8000/api/v1/write/individual-prompts/', {
                        headers: { 'Authorization': `Token ${userToken}` }
                    });
                    setResponses(response.data);
                    setIsLoading(false);
                } catch (err) {
                    setError(`Failed to fetch responses: ${err}`);
                    setIsLoading(false);
                }
            };

            fetchResponses();
        }
    }, [userToken]);

    if (!userToken) {
        return <div>Please log in to view responses.</div>;
    }

    if (isLoading) {
        return <div>Loading responses...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>All My Responses</h1>
            <ul>
                {responses.map((response) => (
                    <li key={response.id}>
                        <Link to={`/a-response-page/${response.id}`}>
                            {response.title || (response.response_text ? stripHtml(response.response_text).slice(0, 25) : response.prompt_text.slice(0, 25))}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewAllResponses;
