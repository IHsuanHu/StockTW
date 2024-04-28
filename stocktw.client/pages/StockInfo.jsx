import { useState, useEffect } from 'react';
import './StockInfo.css';
import Item from './Item';

const StockInfo = ({ searchStock }) => {
    const [stockData, setStockData] = useState([]);
    const serverUrl = `https://localhost:7188/stock/${searchStock}`;

    useEffect(() => {
        async function getStockData() {
            try {
                const response = await fetch(serverUrl);
                if (!response.ok) throw new Error('Failed to fetch data');
                const data = await response.json();
                const formattedData = data.map(stock => ({
                    ...stock,
                    z: parseFloat(stock.pz).toFixed(2),
                    o: parseFloat(stock.pz).toFixed(2)
                }));
                 setStockData(prev => [...formattedData, ...prev]) // Use this if you want to append

            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        }
        getStockData(); }, [searchStock]); // Dependency array includes searchStock to refetch when it changes

    const handleDeleteStock = code => {
        setStockData(currentData => currentData.filter(item => item.c !== code));
    };

    return (
        <div className="list">
            {
                stockData.map((item) => {
                    const { c, n, z, v, t, d, o } = item
                    return <Item code={c} name={n} nowPrice={z} openPrice={o} volume={v} time={t} date={d} key={c} deleteStock={handleDeleteStock} />
                })
            }
        </div>
    );
}

export default StockInfo;
