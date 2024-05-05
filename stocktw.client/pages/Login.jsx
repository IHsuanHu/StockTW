import { useState } from 'react';
import './Login.css';

const Login = ({ setIsLoggedIn, setShowLogin }) => {
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");

    function handleUsernameChange(e) {
        setUsername(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    async function userCheck() {
        const serverUrl = `https://localhost:7188/users/login`;
        const options = {
            method: "POST", 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ username, password }), 
            credentials: 'include'
        };

        try {
            const response = await fetch(serverUrl, options);
            if (!response.ok) throw new Error('Invalid username or password');
            const data = await response.json();
            if (data.success) {
                setIsLoggedIn(true);
                setShowLogin(false);
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Error during login: ', error);
            alert('Login Failed');
        }
    }

    return (
        <div className="login-modal-backdrop">
            <div className="login-modal">
                <h2>Login</h2>
                <label>
                    Username:
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <button onClick={userCheck}>Log In</button>
            </div>
        </div>
    );
};

export default Login;