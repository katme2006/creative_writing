import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom';

function Signup({ onSignupSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/signup/', {
        email,
        password
      });

      // With axios, the response data is directly available in response.data
      const data = response.data;
      if (response.status === 201) {
        console.log('Signup successful', data);
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('email', email);
          onSignupSuccess(data.token, email); 
          navigate('/'); // Navigate to the home page after successful signup
        }
      } else {
        console.error('Signup failed', data);
        // Handle sign up error, possibly update UI with the error
      }
    } catch (error) {
      if (error.response) {
        // Handle error response from server
        console.error('Signup failed:', error.response.data);
      } else {
        // Handle network error
        console.error('Network error:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
