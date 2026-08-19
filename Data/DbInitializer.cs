using System;
using System.Collections.Generic;
using System.Linq;
using CINERA.Models;
using CINERA.Helpers;

namespace CINERA.Data
{
    public static class DbInitializer
    {
        public static void Initialize(AppDbContext context)
        {
            // Ensure DB is created
            context.Database.EnsureCreated();

            // Seed Admin User if not exists
            if (!context.Users.Any(u => u.Email == "admin@cinera.com"))
            {
                var admin = new User
                {
                    Name = "Admin User",
                    Email = "admin@cinera.com",
                    PasswordHash = PasswordHasher.HashPassword("admin123"),
                    Role = "Admin",
                    IsVerified = true,
                    CreatedAt = DateTime.UtcNow
                };
                context.Users.Add(admin);
                context.SaveChanges();
            }

            // Seed Movies if table is empty
            if (!context.Movies.Any())
            {
                var moviesList = new List<Movie>
                {
                    new Movie
                    {
                        Id = 1,
                        Type = "movie",
                        Title = "Interstellar",
                        Year = "2014",
                        Rating = 8.7,
                        Duration = "2h 49m",
                        Genres = "Sci-Fi,Drama,Adventure",
                        Overview = "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
                        Story = "In the near future, Earth is becoming increasingly difficult to live on. A former NASA pilot joins a mission through a mysterious wormhole near Saturn in search of a new home for humanity.",
                        Director = "Christopher Nolan",
                        Cast = "Matthew McConaughey,Anne Hathaway,Jessica Chastain,Michael Caine",
                        Language = "English",
                        Country = "United States",
                        Trailer = "https://www.youtube.com/watch?v=zSWdZVtXT7E",
                        ColorsPrimary = "#0B1D35",
                        ColorsSecondary = "#1C3A5F",
                        ColorsAccent = "#8FB9E8",
                        Poster = ""
                    },
                    new Movie
                    {
                        Id = 2,
                        Type = "movie",
                        Title = "The Dark Knight",
                        Year = "2008",
                        Rating = 9.0,
                        Duration = "2h 32m",
                        Genres = "Action,Crime,Drama",
                        Overview = "Batman faces a criminal mastermind whose reign of chaos pushes Gotham and its heroes to their limits.",
                        Story = "Batman continues his fight against crime in Gotham while the Joker begins a campaign of chaos that challenges the city's heroes.",
                        Director = "Christopher Nolan",
                        Cast = "Christian Bale,Heath Ledger,Aaron Eckhart,Michael Caine",
                        Language = "English",
                        Country = "United States",
                        Trailer = "https://www.youtube.com/watch?v=EXeTwQWrcwY",
                        ColorsPrimary = "#111111",
                        ColorsSecondary = "#242424",
                        ColorsAccent = "#C7A94A",
                        Poster = ""
                    },
                    new Movie
                    {
                        Id = 3,
                        Type = "movie",
                        Title = "Inception",
                        Year = "2010",
                        Rating = 8.8,
                        Duration = "2h 28m",
                        Genres = "Action,Sci-Fi,Thriller",
                        Overview = "A skilled thief who steals secrets through dream-sharing technology is given a chance to erase his past.",
                        Story = "Dom Cobb enters a dangerous mission where dreams become the battlefield.",
                        Director = "Christopher Nolan",
                        Cast = "Leonardo DiCaprio,Joseph Gordon-Levitt,Elliot Page,Tom Hardy",
                        Language = "English",
                        Country = "United States",
                        Trailer = "https://www.youtube.com/watch?v=YoHD9XEInc0",
                        ColorsPrimary = "#17232E",
                        ColorsSecondary = "#344B5E",
                        ColorsAccent = "#78A6C8",
                        Poster = ""
                    },
                    new Movie
                    {
                        Id = 4,
                        Type = "movie",
                        Title = "Dune",
                        Year = "2021",
                        Rating = 8.0,
                        Duration = "2h 35m",
                        Genres = "Sci-Fi,Adventure,Drama",
                        Overview = "Paul Atreides must travel to the most dangerous planet in the universe to ensure the future of his family and people.",
                        Story = "Paul Atreides enters a world of political conflict, ancient prophecy and dangerous desert landscapes.",
                        Director = "Denis Villeneuve",
                        Cast = "Timothée Chalamet,Zendaya,Rebecca Ferguson,Oscar Isaac",
                        Language = "English",
                        Country = "United States",
                        Trailer = "https://www.youtube.com/watch?v=n9xhJrPXop4",
                        ColorsPrimary = "#3B2616",
                        ColorsSecondary = "#76552E",
                        ColorsAccent = "#D7A85D",
                        Poster = ""
                    },
                    new Movie
                    {
                        Id = 5,
                        Type = "movie",
                        Title = "Oppenheimer",
                        Year = "2023",
                        Rating = 8.6,
                        Duration = "3h 0m",
                        Genres = "Drama,History",
                        Overview = "The story of J. Robert Oppenheimer and his role in developing the atomic bomb.",
                        Story = "A brilliant physicist leads a secret project that changes the course of human history forever.",
                        Director = "Christopher Nolan",
                        Cast = "Cillian Murphy,Emily Blunt,Matt Damon,Robert Downey Jr.",
                        Language = "English",
                        Country = "United States",
                        Trailer = "https://www.youtube.com/watch?v=uYPbbksJxIg",
                        ColorsPrimary = "#2A1710",
                        ColorsSecondary = "#63321F",
                        ColorsAccent = "#E0783E",
                        Poster = ""
                    },
                    new Movie
                    {
                        Id = 6,
                        Type = "movie",
                        Title = "The Matrix",
                        Year = "1999",
                        Rating = 8.7,
                        Duration = "2h 16m",
                        Genres = "Action,Sci-Fi",
                        Overview = "A computer hacker discovers that reality is not what it seems and joins a rebellion against machines.",
                        Story = "Neo discovers the hidden truth behind the world he lives in and begins a journey that changes everything.",
                        Director = "The Wachowskis",
                        Cast = "Keanu Reeves,Laurence Fishburne,Carrie-Anne Moss,Hugo Weaving",
                        Language = "English",
                        Country = "United States",
                        Trailer = "https://www.youtube.com/watch?v=vKQi3bBA1y8",
                        ColorsPrimary = "#03130A",
                        ColorsSecondary = "#0B4D2B",
                        ColorsAccent = "#00FF66",
                        Poster = ""
                    },
                    new Movie
                    {
                        Id = 7,
                        Type = "movie",
                        Title = "The Shawshank Redemption",
                        Year = "1994",
                        Rating = 9.3,
                        Duration = "2h 22m",
                        Genres = "Drama",
                        Overview = "Two imprisoned men bond over years, finding solace and eventual redemption through acts of common decency.",
                        Story = "Andy Dufresne is sentenced to life in prison and slowly builds an unexpected friendship with Red while holding onto hope.",
                        Director = "Frank Darabont",
                        Cast = "Tim Robbins,Morgan Freeman,Bob Gunton,William Sadler",
                        Language = "English",
                        Country = "United States",
                        Trailer = "https://www.youtube.com/watch?v=PLl99DlL6b4",
                        ColorsPrimary = "#17212B",
                        ColorsSecondary = "#354B5C",
                        ColorsAccent = "#D1A85A",
                        Poster = ""
                    },
                    new Movie
                    {
                        Id = 8,
                        Type = "movie",
                        Title = "Fight Club",
                        Year = "1999",
                        Rating = 8.8,
                        Duration = "2h 19m",
                        Genres = "Drama,Thriller",
                        Overview = "An insomniac office worker and a mysterious soap maker form an underground fight club.",
                        Story = "A dissatisfied man searching for meaning meets Tyler Durden, leading him into a secret world that completely changes his life.",
                        Director = "David Fincher",
                        Cast = "Brad Pitt,Edward Norton,Helena Bonham Carter,Meat Loaf",
                        Language = "English",
                        Country = "United States",
                        Trailer = "https://www.youtube.com/watch?v=qtRKdVHc-cE",
                        ColorsPrimary = "#21130F",
                        ColorsSecondary = "#4B2118",
                        ColorsAccent = "#D95B3A",
                        Poster = ""
                    },
                    new Movie
                    {
                        Id = 9,
                        Type = "movie",
                        Title = "Blade Runner 2049",
                        Year = "2017",
                        Rating = 8.0,
                        Duration = "2h 44m",
                        Genres = "Sci-Fi,Drama,Mystery",
                        Overview = "A young blade runner unearths a long-buried secret that leads him to track down former LAPD blade runner Rick Deckard.",
                        Story = "Officer K discovers a secret that could completely change the relationship between humans and replicants.",
                        Director = "Denis Villeneuve",
                        Cast = "Ryan Gosling,Harrison Ford,Ana de Armas,Jared Leto",
                        Language = "English",
                        Country = "United States",
                        Trailer = "https://www.youtube.com/watch?v=gCcx85zbxz4",
                        ColorsPrimary = "#171A2B",
                        ColorsSecondary = "#3B274D",
                        ColorsAccent = "#B56CFF",
                        Poster = ""
                    },
                    new Movie
                    {
                        Id = 10,
                        Type = "movie",
                        Title = "The Imitation Game",
                        Year = "2014",
                        Rating = 8.0,
                        Duration = "1h 54m",
                        Genres = "Biography,Drama,Thriller,War",
                        Overview = "During World War II, a brilliant mathematician leads a team attempting to break the German Enigma code.",
                        Story = "Alan Turing and his team race against time at Bletchley Park to break the German Enigma code.",
                        Director = "Morten Tyldum",
                        Cast = "Benedict Cumberbatch,Keira Knightley,Matthew Goode,Mark Strong",
                        Language = "English",
                        Country = "United Kingdom",
                        Trailer = "https://www.youtube.com/watch?v=j2jRs4EAvWM",
                        ColorsPrimary = "#18202A",
                        ColorsSecondary = "#35485A",
                        ColorsAccent = "#D5B46A",
                        Poster = ""
                    },
                    new Movie
                    {
                        Id = 11,
                        Type = "series",
                        Title = "Cosmos: A Spacetime Odyssey",
                        Year = "2014",
                        Rating = 9.2,
                        Duration = "45m",
                        Genres = "Documentary,Science,Space",
                        Overview = "An exploration of the universe, the laws of nature, and humanity's journey to understand space and time.",
                        Story = "Neil deGrasse Tyson takes viewers across space and time, exploring the history of scientific discovery and the mysteries of the universe.",
                        Director = "Brannon Braga",
                        Cast = "Neil deGrasse Tyson",
                        Language = "English",
                        Country = "United States",
                        Trailer = "https://www.youtube.com/watch?v=_erVOAbz420",
                        ColorsPrimary = "#030B1C",
                        ColorsSecondary = "#102D55",
                        ColorsAccent = "#5EB6FF",
                        Poster = ""
                    },
                    new Movie
                    {
                        Id = 12,
                        Type = "movie",
                        Title = "The Martian",
                        Year = "2015",
                        Rating = 8.0,
                        Duration = "2h 24m",
                        Genres = "Sci-Fi,Adventure,Drama",
                        Overview = "An astronaut stranded on Mars must rely on his ingenuity to survive and find a way home.",
                        Story = "Mark Watney uses science, engineering, and determination to survive on Mars while NASA works to bring him home.",
                        Director = "Ridley Scott",
                        Cast = "Matt Damon,Jessica Chastain,Kristen Wiig,Jeff Daniels",
                        Language = "English",
                        Country = "United States",
                        Trailer = "https://www.youtube.com/watch?v=ej3ioOneTy8",
                        ColorsPrimary = "#35190D",
                        ColorsSecondary = "#8A4321",
                        ColorsAccent = "#E68A42",
                        Poster = ""
                    },
                    new Movie
                    {
                        Id = 13,
                        Type = "movie",
                        Title = "Temple Grandin",
                        Year = "2010",
                        Rating = 8.2,
                        Duration = "1h 47m",
                        Genres = "Biography,Drama",
                        Overview = "A biographical drama about Temple Grandin and her journey to becoming a groundbreaking scientist.",
                        Story = "Temple Grandin overcomes significant challenges and uses her unique way of thinking to transform the livestock industry.",
                        Director = "Mick Jackson",
                        Cast = "Claire Danes,Julia Ormond,David Strathairn,Catherine O'Hara",
                        Language = "English",
                        Country = "United States",
                        Trailer = "",
                        ColorsPrimary = "#241A13",
                        ColorsSecondary = "#6A4930",
                        ColorsAccent = "#D49A5C",
                        Poster = ""
                    },
                    new Movie
                    {
                        Id = 14,
                        Type = "series",
                        Title = "Genius",
                        Year = "2017–2024",
                        Rating = 8.2,
                        Duration = "50m",
                        Genres = "Biography,Drama,History",
                        Overview = "A series exploring the lives, discoveries, relationships, and struggles of some of history's greatest minds.",
                        Story = "Genius explores the personal and professional lives of influential figures throughout history.",
                        Director = "Various",
                        Cast = "Geoffrey Rush,Johnny Flynn,Samantha Colley",
                        Language = "English",
                        Country = "United States",
                        Trailer = "",
                        ColorsPrimary = "#17151F",
                        ColorsSecondary = "#3B3154",
                        ColorsAccent = "#B78CFF",
                        Poster = ""
                    },
                    new Movie
                    {
                        Id = 15,
                        Type = "series",
                        Title = "The Big Bang Theory",
                        Year = "2007–2019",
                        Rating = 8.1,
                        Duration = "22m",
                        Genres = "Comedy,Romance,Sitcom",
                        Overview = "The lives of socially awkward scientists take unexpected turns when relationships and everyday life collide.",
                        Story = "A group of brilliant but socially awkward scientists navigate friendship, relationships, careers, and life together.",
                        Director = "Chuck Lorre",
                        Cast = "Jim Parsons,Johnny Galecki,Kaley Cuoco,Simon Helberg",
                        Language = "English",
                        Country = "United States",
                        Trailer = "https://www.youtube.com/watch?v=WBb3fojgW0Q",
                        ColorsPrimary = "#171A22",
                        ColorsSecondary = "#30415A",
                        ColorsAccent = "#62B6E8",
                        Poster = ""
                    },
                    new Movie
                    {
                        Id = 16,
                        Type = "movie",
                        Title = "A Beautiful Mind",
                        Year = "2001",
                        Rating = 8.2,
                        Duration = "2h 15m",
                        Genres = "Biography,Drama,Mystery",
                        Overview = "The story of mathematical genius John Nash and his extraordinary journey through achievement and struggle.",
                        Story = "John Nash rises to international acclaim through his mathematical discoveries while facing a difficult personal journey.",
                        Director = "Ron Howard",
                        Cast = "Russell Crowe,Ed Harris,Jennifer Connelly,Paul Bettany",
                        Language = "English",
                        Country = "United States",
                        Trailer = "https://www.youtube.com/watch?v=aS_d0Ayjw4o",
                        ColorsPrimary = "#151A22",
                        ColorsSecondary = "#3C4B5E",
                        ColorsAccent = "#B9C9D8",
                        Poster = ""
                    },
                    new Movie
                    {
                        Id = 17,
                        Type = "series",
                        Title = "Futurama",
                        Year = "1999–",
                        Rating = 8.5,
                        Duration = "22m",
                        Genres = "Animation,Comedy,Sci-Fi,Adventure",
                        Overview = "A pizza delivery boy is accidentally frozen and wakes up a thousand years in the future.",
                        Story = "Philip J. Fry wakes up in the year 2999 and joins an eccentric delivery crew.",
                        Director = "Matt Groening",
                        Cast = "Billy West,John DiMaggio,Katey Sagal,Tress MacNeille",
                        Language = "English",
                        Country = "United States",
                        Trailer = "",
                        ColorsPrimary = "#071A2A",
                        ColorsSecondary = "#0B526B",
                        ColorsAccent = "#38D9FF",
                        Poster = ""
                    },
                    new Movie
                    {
                        Id = 18,
                        Type = "movie",
                        Title = "Contact",
                        Year = "1997",
                        Rating = 7.5,
                        Duration = "2h 30m",
                        Genres = "Sci-Fi,Drama,Mystery",
                        Overview = "A scientist searching for extraterrestrial life discovers evidence of an intelligent signal from beyond Earth.",
                        Story = "Dr. Ellie Arroway discovers a mysterious signal that could prove humanity is not alone in the universe.",
                        Director = "Robert Zemeckis",
                        Cast = "Jodie Foster,Matthew McConaughey,Tom Skerritt,James Woods",
                        Language = "English",
                        Country = "United States",
                        Trailer = "https://www.youtube.com/watch?v=Q399v-pMG30",
                        ColorsPrimary = "#070B1C",
                        ColorsSecondary = "#172A55",
                        ColorsAccent = "#758CFF",
                        Poster = ""
                    }
                };

                context.Movies.AddRange(moviesList);
                context.SaveChanges();
            }
        }
    }
}
