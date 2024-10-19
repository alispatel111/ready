// App.js
import React, { useState } from 'react';
import Quiz from './components/Quiz';
import Login from './components/Login';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
        setIsLoggedIn(false); // Update state to log out the user
    };

    return (
        <>
            {isLoggedIn ? (
                <Quiz onLogout={handleLogout} /> // Pass handleLogout to Quiz component
            ) : (
                <Login onLogin={setIsLoggedIn} />
            )}
        </>
    );
}

export default App;
