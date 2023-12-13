import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/login/', {
        email, 
        password
      });

      const data = response.data;
      localStorage.setItem('token', data.token); // Saves the token to local storage
      if (onLoginSuccess) {
        onLoginSuccess(data.token, email); 
      }
      navigate('/'); 
    } catch (error) {
      if (error.response) {
        console.error('Login failed:', error.response.data);
      } else if (error.request) {
     
        console.error('Network error:', error.request);
      } else {
        console.error('Error:', error.message);
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
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;