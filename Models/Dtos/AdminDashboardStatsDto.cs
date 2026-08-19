namespace CINERA.Models.Dtos
{
    public class AdminDashboardStatsDto
    {
        public int MovieCount { get; set; }
        public int UsersCount { get; set; }
        public int WatchlistCount { get; set; }
        public double AverageRating { get; set; }
        public int SeriesCount { get; set; }
        public int MovieOnlyCount { get; set; }
    }
}
