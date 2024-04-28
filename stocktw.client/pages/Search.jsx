import { useState } from "react";

const Search = ({ add }) => {

    const [stockNumber, setStockNumber] = useState("")

    function stockNumberChange(e) {
        setStockNumber(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault();  // 防止表单的默认提交行为
        add(stockNumber);
        setStockNumber("");  // 可选：提交后清空输入框
    }
    return <div>
        <h1>Stock Search</h1>
        <form onSubmit={handleSubmit}>  {/* 使用表单元素封装输入和按钮 */}
            <input type="text" value={stockNumber} onChange={stockNumberChange} placeholder="Enter stock code" />
            <button type="submit" className="add">Search</button>
        </form>
    </div>
}

export default Search;