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


    //These variables will be used to format Quill
    const modules = {
        toolbar: [
          [{ 'font': [] }],
          [{size: []}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, 
           {'indent': '-1'}, {'indent': '+1'}],
          [],
          ['clean']
        ],
        clipboard: {
          // Toggle to add extra line breaks when pasting HTML:
          matchVisual: false,
        }
      };
    
      // Formats objects for setting up what to include in the toolbar
      const formats = [
        'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent'
      ];





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

    const handleSubmitResponse = () => {
        console.log(userResponse);
        // We need to put logic here to add to DB once we make the model
    };

    return (
        <div>
            <div>
            <h1>Writing Prompt</h1>
            <p>{generatedText}</p>
            </div>
            <div style={{ marginBottom: '20px' }}>
            <div>
          
            {category && (
                <button onClick={regeneratePrompt}>Regenerate Prompt</button>
            )}
          
            </div>
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
