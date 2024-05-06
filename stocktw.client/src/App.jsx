import { useEffect, useState } from 'react';
import './App.css';
import Search from '../pages/Search';
import StockInfo from '../pages/StockInfo';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

function App() {
    const [stock, setStock] = useState("");
    const [stockData, setStockData] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const checkLoginStatus = () => {
        fetch('https://localhost:7188/users/check-login', { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                if (data.isLoggedIn) {
                    const savedStockData = localStorage.getItem('stockData');
                    setStockData(savedStockData ? JSON.parse(savedStockData) : []); setIsLoggedIn(true);
                } else { clearUserData();}
            })
            .catch(error => {console.error('Error checking login status:', error); clearUserData();});
    };

    const handleLogout = () => {
        fetch('https://localhost:7188/users/logout', { method: 'POST', credentials: 'include' })
            .then(() => {clearUserData();})
            .catch(error => { console.error('Logout failed:', error); clearUserData();});
        };

    const clearUserData = () => {
        setIsLoggedIn(false); setShowLogin(false); setStockData([]);localStorage.removeItem('stockData');
        };

    useEffect(() => { checkLoginStatus();
    }, []);

   
    useEffect(() => {
        if (isLoggedIn) {localStorage.setItem('stockData', JSON.stringify(stockData));}
    }, [stockData, isLoggedIn]);

    return (
        <div>
            {!isLoggedIn && (
                <div className="SignLog">
                <button className="Signup" onClick={() => { setShowSignup(true); setShowLogin(false); }}>Sign Up</button>
                <button className="LogIn" onClick={() => { setShowLogin(true); setShowSignup(false); }}>Log In</button>
            </div>)}
            {isLoggedIn && (
                <button className="button-top-right" onClick={handleLogout}>Log Out</button>)}
            {showSignup && !showLogin && !isLoggedIn && (
                <div className="modal-backdrop">
                <SignUp setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
            </div>)}
            {showLogin && !isLoggedIn && !showSignup && (
                <div className="modal-backdrop">
                <Login setIsLoggedIn={setIsLoggedIn} setShowLogin={setShowLogin} setShowSignup={setShowSignup} setStockData={setStockData} />
            </div>)}
            {isLoggedIn && (
                <div className="stock">
                    <Search add={setStock} />
                    <StockInfo searchStock={stock} stockData={stockData} setStockData={setStockData} />
                </div>
            )}
        </div>
    );
}
export default App;