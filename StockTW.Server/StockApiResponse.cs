namespace StockTW.Server
{
    public class StockApiResponse
    {
        public List<StockInfo> MsgArray { get; set; }
        public string RtCode { get; set; }
        public QueryTime QueryTime { get; set; }
        public string RtMessage { get; set; }
    }

    public class StockInfo
    {
        public string Tv { get; set; }
        public string Ps { get; set; }
        public string Nu { get; set; }
        public string Pz { get; set; }
        public string Bp { get; set; }
        public string A { get; set; }
        public string B { get; set; }
        public string C { get; set; }
        public string D { get; set; }
        public string Ch { get; set; }
        public string Tlong { get; set; }
        public string F { get; set; }
        public string Ip { get; set; }
        public string G { get; set; }
        public string Mt { get; set; }
        public string H { get; set; }
        public string It { get; set; }
        public string L { get; set; }
        public string N { get; set; }
        public string O { get; set; }
        public string P { get; set; }
        public string Ex { get; set; }
        public string S { get; set; }
        public string T { get; set; }
        public string U { get; set; }
        public string V { get; set; }
        public string W { get; set; }
        public string Nf { get; set; }
        public string Y { get; set; }
        public string Z { get; set; }
        public string Ts { get; set; }
    }

    public class QueryTime
    {
        public string SysDate { get; set; }
        public int StockInfoItem { get; set; }
        public int StockInfo { get; set; }
        public string SessionStr { get; set; }
        public string SysTime { get; set; }
        public bool ShowChart { get; set; }
        public int SessionFromTime { get; set; }
        public int SessionLatestTime { get; set; }
    }
}
