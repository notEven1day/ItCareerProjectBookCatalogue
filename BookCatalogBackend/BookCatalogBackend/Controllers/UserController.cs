using BookCatalogBackend.DTOs;
using BookCatalogBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookCatalogBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        // Sign Up Endpoint
        [HttpPost("sign-up")]
        public async Task<IActionResult> SignUp([FromBody] UserSignUpDto userSignUpDto)
        {

            try
            {
                var result = await _userService.SignUpAsync(userSignUpDto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Log In Endpoint
        [HttpPost("log-in")]
        public async Task<IActionResult> LogIn([FromBody] UserLoginDto userLoginDto)
        {
            try
            {
                var user = await _userService.LogInAsync(userLoginDto);
                return Ok(user);  
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }
    }

}
