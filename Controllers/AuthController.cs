using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using CINERA.Data;
using CINERA.Helpers;
using CINERA.Models;
using CINERA.Models.Dtos;
using CINERA.Services;


namespace CINERA.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;

        public AuthController(AppDbContext context, IEmailService emailService, IConfiguration configuration)
        {
            _context = context;
            _emailService = emailService;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (string.IsNullOrEmpty(dto.Email) || string.IsNullOrEmpty(dto.Password) || string.IsNullOrEmpty(dto.Name))
            {
                return BadRequest(new { message = "All fields are required." });
            }

            var emailNormalized = dto.Email.Trim().ToLower();
            if (await _context.Users.AnyAsync(u => u.Email.ToLower() == emailNormalized))
            {
                return BadRequest(new { message = "Email is already registered." });
            }

            var code = new Random().Next(100000, 999999).ToString();
            var user = new User
            {
                Name = dto.Name.Trim(),
                Email = dto.Email.Trim(),
                PasswordHash = PasswordHasher.HashPassword(dto.Password),
                Role = "User",
                IsVerified = false,
                VerificationCode = code,
                VerificationCodeExpires = DateTime.UtcNow.AddMinutes(15),
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Send Verification Code Email
            string emailSubject = "Confirm your CINERA Account";
            string emailBody = $@"
                <div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;'>
                    <h2 style='color: #8FB9E8; text-align: center;'>Welcome to CINERA!</h2>
                    <p>Thank you for creating an account with us. To complete your registration, please use the following 6-digit verification code:</p>
                    <div style='background: #f7f7f9; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; border-radius: 5px; margin: 20px 0; color: #1C3A5F;'>
                        {code}
                    </div>
                    <p>This code will expire in 15 minutes.</p>
                    <hr style='border: none; border-top: 1px solid #eee; margin: 20px 0;'>
                    <p style='font-size: 12px; color: #777;'>If you did not request this email, please ignore it.</p>
                </div>";

            await _emailService.SendEmailAsync(user.Email, emailSubject, emailBody);

            // Send notification/copy to omarabonaka@gmail.com
            string notificationSubject = $"New Registration: {user.Name} ({user.Email})";
            string notificationBody = $@"
                <div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;'>
                    <h2 style='color: #1C3A5F;'>New Registration Notification</h2>
                    <p>A new user has registered. Details:</p>
                    <ul>
                        <li><strong>Name:</strong> {user.Name}</li>
                        <li><strong>Email:</strong> {user.Email}</li>
                        <li><strong>Verification Code:</strong> {code}</li>
                    </ul>
                </div>";
            await _emailService.SendEmailAsync("omarabonaka@gmail.com", notificationSubject, notificationBody);

            return Ok(new { requiresVerification = true, email = user.Email });
        }

        [HttpPost("verify")]
        public async Task<IActionResult> Verify([FromBody] VerifyDto dto)
        {
            if (string.IsNullOrEmpty(dto.Email) || string.IsNullOrEmpty(dto.Code))
            {
                return BadRequest(new { message = "Email and verification code are required." });
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == dto.Email.Trim().ToLower());
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            if (user.IsVerified)
            {
                var tokenStr = GenerateJwtToken(user);
                return Ok(new AuthResponseDto
                {
                    Token = tokenStr,
                    User = new UserDto
                    {
                        Name = user.Name,
                        Email = user.Email,
                        Role = user.Role
                    }
                });
            }

            if (user.VerificationCode != dto.Code.Trim() || user.VerificationCodeExpires < DateTime.UtcNow)
            {
                return BadRequest(new { message = "Invalid or expired verification code." });
            }

            user.IsVerified = true;
            user.VerificationCode = null;
            user.VerificationCodeExpires = null;
            await _context.SaveChangesAsync();

            var token = GenerateJwtToken(user);
            return Ok(new AuthResponseDto
            {
                Token = token,
                User = new UserDto
                {
                    Name = user.Name,
                    Email = user.Email,
                    Role = user.Role
                }
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            if (string.IsNullOrEmpty(dto.Email) || string.IsNullOrEmpty(dto.Password))
            {
                return BadRequest(new { message = "Email and password are required." });
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == dto.Email.Trim().ToLower());
            if (user == null || !PasswordHasher.VerifyPassword(dto.Password, user.PasswordHash))
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            if (!user.IsVerified)
            {
                // Resend verification code if not verified
                var code = new Random().Next(100000, 999999).ToString();
                user.VerificationCode = code;
                user.VerificationCodeExpires = DateTime.UtcNow.AddMinutes(15);
                await _context.SaveChangesAsync();

                string emailSubject = "Confirm your CINERA Account";
                string emailBody = $@"
                    <div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;'>
                        <h2 style='color: #8FB9E8; text-align: center;'>Welcome to CINERA!</h2>
                        <p>To access your account, please verify your email using this 6-digit verification code:</p>
                        <div style='background: #f7f7f9; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; border-radius: 5px; margin: 20px 0; color: #1C3A5F;'>
                            {code}
                        </div>
                        <p>This code will expire in 15 minutes.</p>
                    </div>";

                await _emailService.SendEmailAsync(user.Email, emailSubject, emailBody);

                // Send notification/copy to omarabonaka@gmail.com
                string resendSubject = $"Verification Code Resent: {user.Name} ({user.Email})";
                string resendBody = $@"
                    <div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;'>
                        <h2 style='color: #1C3A5F;'>Verification Code Resend</h2>
                        <p>The verification code has been regenerated for user:</p>
                        <ul>
                            <li><strong>Name:</strong> {user.Name}</li>
                            <li><strong>Email:</strong> {user.Email}</li>
                            <li><strong>Verification Code:</strong> {code}</li>
                        </ul>
                    </div>";
                await _emailService.SendEmailAsync("omarabonaka@gmail.com", resendSubject, resendBody);

                return BadRequest(new { message = "Email is not verified.", requiresVerification = true, email = user.Email });
            }

            var token = GenerateJwtToken(user);
            return Ok(new AuthResponseDto
            {
                Token = token,
                User = new UserDto
                {
                    Name = user.Name,
                    Email = user.Email,
                    Role = user.Role
                }
            });
        }

        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdStr, out int userId))
            {
                return Unauthorized();
            }

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            var watchlistCount = await _context.WatchlistItems.CountAsync(w => w.UserId == userId);

            return Ok(new
            {
                user = new UserDto
                {
                    Name = user.Name,
                    Email = user.Email,
                    Role = user.Role
                },
                watchlistCount = watchlistCount,
                accountStatus = "Active",
                createdAt = user.CreatedAt
            });
        }

        private string GenerateJwtToken(User user)
        {
            var jwtKey = _configuration["Jwt:Key"] ?? "CineraSuperSecretAuthenticationKeyThatIsVeryLongAndSecureForSigningTokens123!";
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(jwtKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Name),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                Issuer = _configuration["Jwt:Issuer"] ?? "CineraBackend",
                Audience = _configuration["Jwt:Audience"] ?? "CineraFrontend",
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
