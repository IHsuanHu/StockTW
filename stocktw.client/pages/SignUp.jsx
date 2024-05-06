import { useState } from 'react';
import './SignUp.css';

const SignUp = ({ setShowLogin, setShowSignup }) => {
    const [userName, createUser] = useState("");
    const [password, createPassword] = useState("");

    function setUserName(e) {
        createUser(e.target.value)
    }
    function setPassword(e) {
        createPassword(e.target.value)
    }
    async function addUser() {
        const serverUrl = 'https://localhost:7188/users/'
        const options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName, password }),
            credentials: 'include'
        };
        try {
            const response = await fetch(serverUrl, options)
            const data = await response.json();
            if (!response.ok) throw new Error(data.message); // Check for error message
            if (data.success) {
                setShowLogin(true);
                setShowSignup(false);
                alert('New user created successfully');
            }
        } catch (error) {
            console.error('Error during sign up: ', error);
            alert('Failed to create new user: ' + error.message);
        }
    }
    return <div className="login-modal-backdrop">
        <div className="login-modal">
            <h2>Sign Up</h2>
            <form onSubmit={(e) => { e.preventDefault(); addUser(); }}>
                <label>
                    Username:
                    <input type="text" value={userName} onChange={setUserName} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={setPassword} required />
                </label>
                <button type="submit">Sign Up</button>
            </form>
            <p className="toggle-form">
                Have an account? <a href="#" onClick={(e) => {e.preventDefault(); setShowSignup(false); setShowLogin(true);}}>Log in here</a>
            </p>
        </div>
    </div>
};
export default SignUp;
