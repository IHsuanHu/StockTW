using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto.Generators;
using StockTW.Server.Data;

namespace StockTW.Server.Controllers
{
    [Route("users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _dataContext;
        
        public UsersController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAllUser()
        {
            var users = await _dataContext.Users.ToListAsync();
            return Ok(users);
        }
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("User is null");
            }
            if (_dataContext.Users.Any(u => u.Username == user.Username))
            { 
                return BadRequest("Username already exists.");
            }
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            _dataContext.Users.Add(user);
            await _dataContext.SaveChangesAsync();
            return Ok(user);
        }
        [HttpGet("username")]
        public async Task<ActionResult<User>> GetUserById(string username)
        {
            // Use FirstOrDefaultAsync to find the user by username
            var user = await _dataContext.Users.Where(u => u.Username == username).FirstOrDefaultAsync(); 
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }


    }
}
