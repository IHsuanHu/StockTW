import './Item.css'

const Item = ({ code, name, nowPrice, openPrice, volume, time, date, deleteStock }) => {

    function deleteItem() {
        deleteStock(code); 
    }

    return (
        <div className="item">
            <div className="item-details">
                <h3>{`${code}  ${name}`}</h3>
                <p>Now Price: <span>{nowPrice || 'N/A'}</span></p>
                <p>Open Price: <span>{openPrice || 'N/A'}</span></p>
                <p>Volume: <span>{volume}</span></p>
                <p>Date: <span>{date}</span> Time: <span>{time}</span></p>
            </div>
            <button className="remove" onClick={() => deleteStock(code)}>Delete</button>
        </div>
    );
}

export default Item;