import React, { useState } from 'react';

function Signup({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/v1/users/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.status === 201) {
                console.log('Signup successful', data);
                if (data.token) {
                    // If the API also provides a token upon signup, handle the token
                    localStorage.setItem('token', data.token);
                    onLoginSuccess(data.token); // Update app state to reflect logged-in user
                }
            } else {
                console.error('Signup failed', data);
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
