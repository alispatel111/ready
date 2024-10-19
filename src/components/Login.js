// Login.js
import React, { useState } from 'react';
import './Login.css';
import { login } from '../authService'; // Import the authentication function

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false); // State for toast

    const handleLogin = (e) => {
        e.preventDefault();
        // Call the authentication function
        if (login(email, password)) {
            onLogin(true); // Set logged in status
            setError('');
            setShowToast(true); // Show toast
            setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
        } else {
            setError('Invalid email or password.'); // Set error message
        }
    };

    return (
        <div className="login-container">
            {showToast && <div className="toast">Successfully logged in!</div>}
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin} className="login-form">
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="input-field"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="input-field"
                />
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}

export default Login;
