namespace StockTW.Server
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; } // Note: Storing passwords as plain text is not secure.
    }
}
