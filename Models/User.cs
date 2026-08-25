using System;

namespace CINERA.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "User"; // "Admin" or "User"
        public bool IsVerified { get; set; } = false;
        public string? VerificationCode { get; set; }
        public DateTime? VerificationCodeExpires { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
