namespace CINERA.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Type { get; set; } = "movie"; // "movie" or "series"
        public string Title { get; set; } = string.Empty;
        public string Year { get; set; } = string.Empty;
        public double Rating { get; set; }
        public string Duration { get; set; } = string.Empty;
        public string Overview { get; set; } = string.Empty;
        public string Story { get; set; } = string.Empty;
        public string Director { get; set; } = string.Empty;
        public string Cast { get; set; } = string.Empty; // Comma separated or JSON string
        public string Genres { get; set; } = string.Empty; // Comma separated or JSON string
        public string Language { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string Trailer { get; set; } = string.Empty;
        public string ColorsPrimary { get; set; } = string.Empty;
        public string ColorsSecondary { get; set; } = string.Empty;
        public string ColorsAccent { get; set; } = string.Empty;
        public string? Poster { get; set; }
    }
}
