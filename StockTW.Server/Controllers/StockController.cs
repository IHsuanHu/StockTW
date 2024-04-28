using Microsoft.AspNetCore.Mvc;
using StockSelector.Server.Controllers;
using StockSelector.Server;
using System.Net.Http;
using System.Text.Json;
using System.Net.Http.Headers;
using StockTW.Server;
using Newtonsoft.Json;

namespace StockSelector.Server.Controllers
{
    [ApiController]
    [Route("stock")]
    public class StockController : ControllerBase
    {
        [HttpGet("{stockCodes}")]
        public IEnumerable<StockInfo> Get(string stockCodes)
        {
            RealTimePrice stock = new RealTimePrice(stockCodes);
            return stock.GetStockInfoList();
        }

    }
}
public class RealTimePrice
{
    private readonly string _baseUrl = "https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=";
    public string[] codes;
    public RealTimePrice(string company)
    {
        char[] delimiter = { ',', ' ' };
        this.codes = company.Split(delimiter, StringSplitOptions.RemoveEmptyEntries);
        for (int i = 0; i < codes.Length; i++)
        {
            if (this.codes[i].Substring(0, 1).CompareTo("6") >= 0)
            {
                this.codes[i] = "otc_" + codes[i] + ".tw";
            }
            else
            {
                this.codes[i] = "tse_" + codes[i] + ".tw";
            }
        }
    }
    public List<StockInfo> GetStockInfoList()
    {   
        List<StockInfo> stockInfoList = new List<StockInfo>();
        string finalUrl = String.Join("|", this.codes);
        HttpClient client = new HttpClient();
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        HttpResponseMessage response = client.GetAsync(this._baseUrl + finalUrl).Result;
        response.EnsureSuccessStatusCode();
        if (response.IsSuccessStatusCode)
        {
            var responseBoby = response.Content.ReadAsStringAsync().Result.Trim();
            if (!string.IsNullOrEmpty(responseBoby)) { 
                StockApiResponse stockApiResponse = JsonConvert.DeserializeObject<StockApiResponse>(responseBoby);
                if (stockApiResponse != null) { stockInfoList = stockApiResponse.MsgArray; }
            }
            
        }
        client.Dispose();
        return stockInfoList;
        
    }
}
