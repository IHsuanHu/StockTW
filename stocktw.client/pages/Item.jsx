const Item = ({ code, name, nowPrice, openPrice, volume, time, date, deleteStock }) => {

    function deleteItem() {
        deleteStock(code);  // 直接传递股票代码到删除函数
    }

    return <div className="item">
        
        <div>
            <p>{`${code} ${name}`}</p>
            <p>{`Now Price: ${nowPrice} Open Price: ${openPrice} Volume: ${volume}`}</p>
            <p>{`${date} ${time}`}</p>
        </div>

        <button className="remove" onClick={deleteItem}>Delete</button>
    </div>
}

export default Item;