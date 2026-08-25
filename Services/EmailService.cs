using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace CINERA.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string htmlMessage)
        {
            // Print to Console/Debug first so developers can always see it
            Console.WriteLine("\n==================================================");
            Console.WriteLine($"[EMAIL VERIFICATION CODE SENDING]");
            Console.WriteLine($"To: {toEmail}");
            Console.WriteLine($"Subject: {subject}");
            Console.WriteLine($"Body: {htmlMessage}");
            Console.WriteLine("==================================================\n");

            var host = _configuration["Smtp:Host"];
            var portStr = _configuration["Smtp:Port"];
            var username = _configuration["Smtp:Username"];
            var password = _configuration["Smtp:Password"];
            var fromEmail = _configuration["Smtp:FromEmail"] ?? "no-reply@cinera.com";
            var fromName = _configuration["Smtp:FromName"] ?? "CINERA";

            if (string.IsNullOrEmpty(host))
            {
                _logger.LogInformation("SMTP Host is not configured. Email logged to console.");
                return;
            }

            try
            {
                int port = int.TryParse(portStr, out int p) ? p : 587;
                using (var client = new SmtpClient(host, port))
                {
                    client.EnableSsl = true;
                    if (!string.IsNullOrEmpty(username) && !string.IsNullOrEmpty(password))
                    {
                        client.Credentials = new NetworkCredential(username, password);
                    }

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress(fromEmail, fromName),
                        Subject = subject,
                        Body = htmlMessage,
                        IsBodyHtml = true
                    };
                    mailMessage.To.Add(toEmail);

                    await client.SendMailAsync(mailMessage);
                    _logger.LogInformation($"Verification email sent successfully to {toEmail}");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to send email to {toEmail} via SMTP. Email was logged to console.");
            }
        }
    }
}
