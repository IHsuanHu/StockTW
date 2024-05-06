import { useState } from 'react';
import './Login.css';

const Login = ({ setIsLoggedIn, setShowLogin, setShowSignup, setStockData }) => {
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");

    function usernameChange(e) {
        setUsername(e.target.value);
    }

    function passwordChange(e) {
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
                // 先清除旧数据再设置登录状态
                setStockData([]);
                localStorage.removeItem('stockData'); // 清除本地存储的股票数据
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
                <h2>Log In</h2>
                <form onSubmit={(e) => { e.preventDefault(); userCheck();}}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={usernameChange} autoFocus />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={passwordChange} />
                </label>
                    <button type="submit">Log In</button>
                </form>
                <p className="toggle-form">
                    Need an account? <a href="#" onClick={(e) => { e.preventDefault(); setShowLogin(false); setShowSignup(true);}}>Sign up here</a>
                </p>
            </div>
        </div>
    );
};

export default Login;