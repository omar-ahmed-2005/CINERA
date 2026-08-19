using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CINERA.Data;
using CINERA.Models;
using CINERA.Models.Dtos;

namespace CINERA.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("dashboard/stats")]
        public async Task<IActionResult> GetDashboardStats()
        {
            var movieCount = await _context.Movies.CountAsync();
            var usersCount = await _context.Users.CountAsync();
            var watchlistCount = await _context.WatchlistItems.CountAsync();
            var averageRating = movieCount > 0 ? await _context.Movies.AverageAsync(m => m.Rating) : 0.0;
            var seriesCount = await _context.Movies.CountAsync(m => m.Type == "series");
            var movieOnlyCount = await _context.Movies.CountAsync(m => m.Type == "movie");

            return Ok(new AdminDashboardStatsDto
            {
                MovieCount = movieCount,
                UsersCount = usersCount,
                WatchlistCount = watchlistCount,
                AverageRating = Math.Round(averageRating, 1),
                SeriesCount = seriesCount,
                MovieOnlyCount = movieOnlyCount
            });
        }

        [HttpGet("movies")]
        public async Task<IActionResult> GetMovies()
        {
            var movies = await _context.Movies.ToListAsync();
            return Ok(movies);
        }

        [HttpDelete("movies/{id}")]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null)
            {
                return NotFound(new { message = "Movie not found." });
            }

            _context.Movies.Remove(movie);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Movie deleted successfully." });
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users
                .Select(u => new
                {
                    u.Name,
                    u.Email,
                    u.Role,
                    u.IsVerified,
                    u.CreatedAt
                })
                .ToListAsync();

            return Ok(users);
        }

        [HttpDelete("users/{email}")]
        public async Task<IActionResult> DeleteUser(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == email.Trim().ToLower());
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            if (user.Role == "Admin")
            {
                return BadRequest(new { message = "Admin users cannot be deleted." });
            }

            // Remove related items
            var watchlistItems = _context.WatchlistItems.Where(w => w.UserId == user.Id);
            _context.WatchlistItems.RemoveRange(watchlistItems);

            var reviews = _context.Reviews.Where(r => r.UserId == user.Id);
            _context.Reviews.RemoveRange(reviews);

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User and their data deleted successfully." });
        }

        [HttpGet("reviews")]
        public async Task<IActionResult> GetReviews()
        {
            var reviews = await _context.Reviews.ToListAsync();
            return Ok(reviews);
        }

        [HttpDelete("reviews/{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
            {
                return NotFound(new { message = "Review not found." });
            }

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Review deleted successfully." });
        }
    }
}
