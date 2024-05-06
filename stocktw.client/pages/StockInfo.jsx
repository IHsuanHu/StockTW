import { useEffect } from 'react';
import './StockInfo.css';
import Item from './Item';

const StockInfo = ({ searchStock, stockData, setStockData }) => {
    const serverUrl = `https://localhost:7188/stock/${searchStock}`;

    useEffect(() => {
        async function getStockData() {
            try {
                const response = await fetch(serverUrl);
                if (!response.ok) throw new Error('Failed to fetch data');
                const data = await response.json();
                const formattedData = data.map(stock => ({ ...stock,
                    z: parseFloat(stock.pz).toFixed(2),
                    o: parseFloat(stock.pz).toFixed(2)
                }));

                setStockData(prev => {
                    const newData = formattedData.filter(newItem => !prev.some(prevItem => prevItem.c === newItem.c));
                    return [...prev, ...newData];
                });

            } catch (error) { console.error('Error fetching stock data:', error);}
        }
        if (searchStock) { getStockData();}
    }, [searchStock, setStockData]); 

    const handleDeleteStock = code => { setStockData(currentData => currentData.filter(item => item.c !== code));};

    return (
        <div className="list">
            {
                stockData.map((item) => {
                    const { c, n, z, v, t, d, o } = item;
                    return <Item code={c} name={n} nowPrice={z} openPrice={o} volume={v} time={t} date={d} key={c} deleteStock={handleDeleteStock} />
                })
            }
        </div>
    );
}

export default StockInfo;
