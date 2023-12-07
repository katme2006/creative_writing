import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup({ onSignupSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/v1/users/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.status === 201) {
        console.log('Signup successful', data);
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('email', email);
          onSignupSuccess(data.token, email); // Update app state
          navigate('/'); // Navigate to the homepage or profile page
        }
      } else {
        console.error('Signup failed', data);
        // Handle sign up error, possibly update UI with the error
      }
    } catch (error) {
      console.error('Network error:', error);
      
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
