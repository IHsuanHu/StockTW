import './Search.css';
import { useState } from "react";

const Search = ({ add }) => {

    const [stockNumber, setStockNumber] = useState("")

    function stockNumberChange(e) {
        setStockNumber(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault();  
        add(stockNumber);
        setStockNumber("");  
    }
    return (
        <div className="search-container">
            <h1>Stock Search</h1>
            <form onSubmit={handleSubmit}>
                <input
                    className="searchbar"
                    type="text"
                    value={stockNumber}
                    onChange={stockNumberChange}
                    placeholder="Enter stock code using blank or comma to separate"
                />
                <button type="submit" className="add">Search</button>
            </form>
        </div>
    );
}

export default Search;