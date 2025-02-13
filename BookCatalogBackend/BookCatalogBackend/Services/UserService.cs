using BookCatalogBackend.DTOs;
using BookCatalogBackend.models;
using Microsoft.EntityFrameworkCore;

namespace BookCatalogBackend.Services
{
    public class UserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Method to Register a New User (Sign Up)
        public async Task<string> SignUpAsync(UserSignUpDto userSignUpDto)
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == userSignUpDto.Username || u.Email == userSignUpDto.Email);

            if (existingUser != null)
            {
                throw new Exception("Username or Email already exists.");
            }

            var user = new User
            {
                Username = userSignUpDto.Username,
                Email = userSignUpDto.Email,
                Password = userSignUpDto.Password, // Store plain password
                Role = userSignUpDto.Role,
                CreatedAt = DateTime.UtcNow,
                ProfilePicUrl = "https://m.media-amazon.com/images/I/61ZewDE3beL._AC_UF1000,1000_QL80_.jpg"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return "User registered successfully";
        }

        // Method to Log In User (Username or Email + Password)
        public async Task<User> LogInAsync(UserLoginDto userLoginDto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == userLoginDto.UsernameOrEmail || u.Email == userLoginDto.UsernameOrEmail);

            if (user == null || user.Password != userLoginDto.Password)  // Compare passwords in plain text
            {
                throw new Exception("Invalid username/email or password.");
            }

            return user;  // Return user for further operations (e.g., token generation)
        }
    }

}
