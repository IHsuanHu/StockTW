import { useEffect, useState } from 'react';
import './App.css';
import Search from '../pages/Search';
import StockInfo from '../pages/StockInfo';
import Item from '../pages/Item';

function App() {

    const [stock, setStock] = useState("");
    console.log(stock)
    return <div>home
        <Search add={setStock} />
        <StockInfo searchStock={stock} />
    </div>
}

export default App;

