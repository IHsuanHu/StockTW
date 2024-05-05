using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockTW.Server.Data;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

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
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto userLoginDto)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(u => u.Username == userLoginDto.Username);
            if (user != null && BCrypt.Net.BCrypt.Verify(userLoginDto.Password, user.Password))
            {
                var claims = new List<Claim> { new Claim(ClaimTypes.Name, user.Username),new Claim(ClaimTypes.NameIdentifier, user.Username)};
                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                var authProperties = new AuthenticationProperties{ RedirectUri = "/"};
                await HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);
                return Ok(new { success = true });
            }
            return Unauthorized("Invalid username or password");
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok(new {success = true});
        }
        [HttpGet("check-login")]
        public IActionResult CheckLogin()
        {
            bool isLoggedIn = User.Identity.IsAuthenticated;
            return Ok(new {isLoggedIn});
        }

    }
}
