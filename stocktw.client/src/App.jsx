import { useEffect, useState } from 'react';
import './App.css';
import Search from '../pages/Search';
import StockInfo from '../pages/StockInfo';
import Login from '../pages/Login';

function App() {
    const [stock, setStock] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false); 

    const checkLoginStatus = () => {
        fetch('https://localhost:7188/users/check-login', {credentials: 'include'})
        .then(response => response.json())
        .then(data => {setIsLoggedIn(data.isLoggedIn);})
        .catch(error => console.error('Error checking login status:', error));
    };
    const handleLogout = () => {
        fetch('https://localhost:7188/users/logout', { method: 'POST', credentials: 'include' })
        .then(() => {setIsLoggedIn(false);setShowLogin(false);checkLoginStatus();})
        .catch(error => console.error('Logout failed:', error));
    };
    useEffect(() => {
        checkLoginStatus();
    }, []);

    return (
        <div>
            {!isLoggedIn && (<button className="button-top-right" onClick={() => setShowLogin(true)}>Log In</button>)}
            {isLoggedIn && (<button className="button-top-right" onClick={handleLogout}>Log Out</button>)}

            {showLogin && !isLoggedIn && (<div className="login-modal-backdrop">
                    <Login setIsLoggedIn={setIsLoggedIn} setShowLogin={setShowLogin} />
                </div>
            )}

            {isLoggedIn && (
                <div>
                    <Search add={setStock} />
                    <StockInfo searchStock={stock} />
                </div>
            )}
        </div>
    );
}
export default App;