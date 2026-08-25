const movies = [
  {
    id: 1,
    type: "movie",
    title: "Interstellar",
    year: 2014,
    rating: 8.7,
    duration: "2h 49m",
    genres: ["Sci-Fi", "Drama", "Adventure"],
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    story:
      "In the near future, Earth is becoming increasingly difficult to live on. A former NASA pilot joins a mission through a mysterious wormhole near Saturn in search of a new home for humanity.",
    director: "Christopher Nolan",
    cast: [
      "Matthew McConaughey",
      "Anne Hathaway",
      "Jessica Chastain",
      "Michael Caine",
    ],
    language: "English",
    country: "United States",
    trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    colors: {
      primary: "#0B1D35",
      secondary: "#1C3A5F",
      accent: "#8FB9E8",
    },
    reviews: [],
  },

  {
    id: 2,
    type: "movie",
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    duration: "2h 32m",
    genres: ["Action", "Crime", "Drama"],
    overview:
      "Batman faces a criminal mastermind whose reign of chaos pushes Gotham and its heroes to their limits.",
    story:
      "Batman continues his fight against crime in Gotham while the Joker begins a campaign of chaos that challenges the city's heroes.",
    director: "Christopher Nolan",
    cast: [
      "Christian Bale",
      "Heath Ledger",
      "Aaron Eckhart",
      "Michael Caine",
    ],
    language: "English",
    country: "United States",
    trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    colors: {
      primary: "#111111",
      secondary: "#242424",
      accent: "#C7A94A",
    },
    reviews: [],
  },

  {
    id: 3,
    type: "movie",
    title: "Inception",
    year: 2010,
    rating: 8.8,
    duration: "2h 28m",
    genres: ["Action", "Sci-Fi", "Thriller"],
    overview:
      "A skilled thief who steals secrets through dream-sharing technology is given a chance to erase his past.",
    story:
      "Dom Cobb enters a dangerous mission where dreams become the battlefield.",
    director: "Christopher Nolan",
    cast: [
      "Leonardo DiCaprio",
      "Joseph Gordon-Levitt",
      "Elliot Page",
      "Tom Hardy",
    ],
    language: "English",
    country: "United States",
    trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    colors: {
      primary: "#17232E",
      secondary: "#344B5E",
      accent: "#78A6C8",
    },
    reviews: [],
  },

  {
    id: 4,
    type: "movie",
    title: "Dune",
    year: 2021,
    rating: 8.0,
    duration: "2h 35m",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    overview:
      "Paul Atreides must travel to the most dangerous planet in the universe to ensure the future of his family and people.",
    story:
      "Paul Atreides enters a world of political conflict, ancient prophecy and dangerous desert landscapes.",
    director: "Denis Villeneuve",
    cast: [
      "Timothée Chalamet",
      "Zendaya",
      "Rebecca Ferguson",
      "Oscar Isaac",
    ],
    language: "English",
    country: "United States",
    trailer: "https://www.youtube.com/watch?v=n9xhJrPXop4",
    colors: {
      primary: "#3B2616",
      secondary: "#76552E",
      accent: "#D7A85D",
    },
    reviews: [],
  },

  {
    id: 5,
    type: "movie",
    title: "Oppenheimer",
    year: 2023,
    rating: 8.6,
    duration: "3h 0m",
    genres: ["Drama", "History"],
    overview:
      "The story of J. Robert Oppenheimer and his role in developing the atomic bomb.",
    story:
      "A brilliant physicist leads a secret project that changes the course of human history forever.",
    director: "Christopher Nolan",
    cast: [
      "Cillian Murphy",
      "Emily Blunt",
      "Matt Damon",
      "Robert Downey Jr.",
    ],
    language: "English",
    country: "United States",
    trailer: "https://www.youtube.com/watch?v=uYPbbksJxIg",
    colors: {
      primary: "#2A1710",
      secondary: "#63321F",
      accent: "#E0783E",
    },
    reviews: [],
  },

  {
    id: 6,
    type: "movie",
    title: "The Matrix",
    year: 1999,
    rating: 8.7,
    duration: "2h 16m",
    genres: ["Action", "Sci-Fi"],
    overview:
      "A computer hacker discovers that reality is not what it seems and joins a rebellion against machines.",
    story:
      "Neo discovers the hidden truth behind the world he lives in and begins a journey that changes everything.",
    director: "The Wachowskis",
    cast: [
      "Keanu Reeves",
      "Laurence Fishburne",
      "Carrie-Anne Moss",
      "Hugo Weaving",
    ],
    language: "English",
    country: "United States",
    trailer: "https://www.youtube.com/watch?v=vKQi3bBA1y8",
    colors: {
      primary: "#03130A",
      secondary: "#0B4D2B",
      accent: "#00FF66",
    },
    reviews: [],
  },

  {
    id: 7,
    type: "movie",
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    duration: "2h 22m",
    genres: ["Drama"],
    overview:
      "Two imprisoned men bond over years, finding solace and eventual redemption through acts of common decency.",
    story:
      "Andy Dufresne is sentenced to life in prison and slowly builds an unexpected friendship with Red while holding onto hope.",
    director: "Frank Darabont",
    cast: [
      "Tim Robbins",
      "Morgan Freeman",
      "Bob Gunton",
      "William Sadler",
    ],
    language: "English",
    country: "United States",
    trailer: "https://www.youtube.com/watch?v=PLl99DlL6b4",
    colors: {
      primary: "#17212B",
      secondary: "#354B5C",
      accent: "#D1A85A",
    },
    reviews: [],
  },

  {
    id: 8,
    type: "movie",
    title: "Fight Club",
    year: 1999,
    rating: 8.8,
    duration: "2h 19m",
    genres: ["Drama", "Thriller"],
    overview:
      "An insomniac office worker and a mysterious soap maker form an underground fight club.",
    story:
      "A dissatisfied man searching for meaning meets Tyler Durden, leading him into a secret world that completely changes his life.",
    director: "David Fincher",
    cast: [
      "Brad Pitt",
      "Edward Norton",
      "Helena Bonham Carter",
      "Meat Loaf",
    ],
    language: "English",
    country: "United States",
    trailer: "https://www.youtube.com/watch?v=qtRKdVHc-cE",
    colors: {
      primary: "#21130F",
      secondary: "#4B2118",
      accent: "#D95B3A",
    },
    reviews: [],
  },

  {
    id: 9,
    type: "movie",
    title: "Blade Runner 2049",
    year: 2017,
    rating: 8.0,
    duration: "2h 44m",
    genres: ["Sci-Fi", "Drama", "Mystery"],
    overview:
      "A young blade runner unearths a long-buried secret that leads him to track down former LAPD blade runner Rick Deckard.",
    story:
      "Officer K discovers a secret that could completely change the relationship between humans and replicants.",
    director: "Denis Villeneuve",
    cast: [
      "Ryan Gosling",
      "Harrison Ford",
      "Ana de Armas",
      "Jared Leto",
    ],
    language: "English",
    country: "United States",
    trailer: "https://www.youtube.com/watch?v=gCcx85zbxz4",
    colors: {
      primary: "#171A2B",
      secondary: "#3B274D",
      accent: "#B56CFF",
    },
    reviews: [],
  },

  {
    id: 10,
    type: "movie",
    title: "The Imitation Game",
    year: 2014,
    rating: 8.0,
    duration: "1h 54m",
    genres: ["Biography", "Drama", "Thriller", "War"],
    overview:
      "During World War II, a brilliant mathematician leads a team attempting to break the German Enigma code.",
    story:
      "Alan Turing and his team race against time at Bletchley Park to break the German Enigma code.",
    director: "Morten Tyldum",
    cast: [
      "Benedict Cumberbatch",
      "Keira Knightley",
      "Matthew Goode",
      "Mark Strong",
    ],
    language: "English",
    country: "United Kingdom",
    trailer: "https://www.youtube.com/watch?v=j2jRs4EAvWM",
    colors: {
      primary: "#18202A",
      secondary: "#35485A",
      accent: "#D5B46A",
    },
    reviews: [],
  },

  {
    id: 11,
    type: "series",
    title: "Cosmos: A Spacetime Odyssey",
    year: 2014,
    rating: 9.2,
    duration: "45m",
    genres: ["Documentary", "Science", "Space"],
    overview:
      "An exploration of the universe, the laws of nature, and humanity's journey to understand space and time.",
    story:
      "Neil deGrasse Tyson takes viewers across space and time, exploring the history of scientific discovery and the mysteries of the universe.",
    director: "Brannon Braga",
    cast: [
      "Neil deGrasse Tyson",
    ],
    language: "English",
    country: "United States",
    trailer: "https://www.youtube.com/watch?v=_erVOAbz420",
    colors: {
      primary: "#030B1C",
      secondary: "#102D55",
      accent: "#5EB6FF",
    },
    reviews: [],
  },

  {
    id: 12,
    type: "movie",
    title: "The Martian",
    year: 2015,
    rating: 8.0,
    duration: "2h 24m",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    overview:
      "An astronaut stranded on Mars must rely on his ingenuity to survive and find a way home.",
    story:
      "Mark Watney uses science, engineering, and determination to survive on Mars while NASA works to bring him home.",
    director: "Ridley Scott",
    cast: [
      "Matt Damon",
      "Jessica Chastain",
      "Kristen Wiig",
      "Jeff Daniels",
    ],
    language: "English",
    country: "United States",
    trailer: "https://www.youtube.com/watch?v=ej3ioOneTy8",
    colors: {
      primary: "#35190D",
      secondary: "#8A4321",
      accent: "#E68A42",
    },
    reviews: [],
  },

  {
    id: 13,
    type: "movie",
    title: "Temple Grandin",
    year: 2010,
    rating: 8.2,
    duration: "1h 47m",
    genres: ["Biography", "Drama"],
    overview:
      "A biographical drama about Temple Grandin and her journey to becoming a groundbreaking scientist.",
    story:
      "Temple Grandin overcomes significant challenges and uses her unique way of thinking to transform the livestock industry.",
    director: "Mick Jackson",
    cast: [
      "Claire Danes",
      "Julia Ormond",
      "David Strathairn",
      "Catherine O'Hara",
    ],
    language: "English",
    country: "United States",
    trailer: "",
    colors: {
      primary: "#241A13",
      secondary: "#6A4930",
      accent: "#D49A5C",
    },
    reviews: [],
  },

  {
    id: 14,
    type: "series",
    title: "Genius",
    year: "2017–2024",
    rating: 8.2,
    duration: "50m",
    genres: ["Biography", "Drama", "History"],
    overview:
      "A series exploring the lives, discoveries, relationships, and struggles of some of history's greatest minds.",
    story:
      "Genius explores the personal and professional lives of influential figures throughout history.",
    director: "Various",
    cast: [
      "Geoffrey Rush",
      "Johnny Flynn",
      "Samantha Colley",
    ],
    language: "English",
    country: "United States",
    trailer: "",
    colors: {
      primary: "#17151F",
      secondary: "#3B3154",
      accent: "#B78CFF",
    },
    reviews: [],
  },

  {
    id: 15,
    type: "series",
    title: "The Big Bang Theory",
    year: "2007–2019",
    rating: 8.1,
    duration: "22m",
    genres: ["Comedy", "Romance", "Sitcom"],
    overview:
      "The lives of socially awkward scientists take unexpected turns when relationships and everyday life collide.",
    story:
      "A group of brilliant but socially awkward scientists navigate friendship, relationships, careers, and life together.",
    director: "Chuck Lorre",
    cast: [
      "Jim Parsons",
      "Johnny Galecki",
      "Kaley Cuoco",
      "Simon Helberg",
    ],
    language: "English",
    country: "United States",
    trailer: "https://www.youtube.com/watch?v=WBb3fojgW0Q",
    colors: {
      primary: "#171A22",
      secondary: "#30415A",
      accent: "#62B6E8",
    },
    reviews: [],
  },

  {
    id: 16,
    type: "movie",
    title: "A Beautiful Mind",
    year: 2001,
    rating: 8.2,
    duration: "2h 15m",
    genres: ["Biography", "Drama", "Mystery"],
    overview:
      "The story of mathematical genius John Nash and his extraordinary journey through achievement and struggle.",
    story:
      "John Nash rises to international acclaim through his mathematical discoveries while facing a difficult personal journey.",
    director: "Ron Howard",
    cast: [
      "Russell Crowe",
      "Ed Harris",
      "Jennifer Connelly",
      "Paul Bettany",
    ],
    language: "English",
    country: "United States",
    trailer: "https://www.youtube.com/watch?v=aS_d0Ayjw4o",
    colors: {
      primary: "#151A22",
      secondary: "#3C4B5E",
      accent: "#B9C9D8",
    },
    reviews: [],
  },

  {
    id: 17,
    type: "series",
    title: "Futurama",
    year: "1999–",
    rating: 8.5,
    duration: "22m",
    genres: ["Animation", "Comedy", "Sci-Fi", "Adventure"],
    overview:
      "A pizza delivery boy is accidentally frozen and wakes up a thousand years in the future.",
    story:
      "Philip J. Fry wakes up in the year 2999 and joins an eccentric delivery crew.",
    director: "Matt Groening",
    cast: [
      "Billy West",
      "John DiMaggio",
      "Katey Sagal",
      "Tress MacNeille",
    ],
    language: "English",
    country: "United States",
    trailer: "",
    colors: {
      primary: "#071A2A",
      secondary: "#0B526B",
      accent: "#38D9FF",
    },
    reviews: [],
  },

  {
    id: 18,
    type: "movie",
    title: "Contact",
    year: 1997,
    rating: 7.5,
    duration: "2h 30m",
    genres: ["Sci-Fi", "Drama", "Mystery"],
    overview:
      "A scientist searching for extraterrestrial life discovers evidence of an intelligent signal from beyond Earth.",
    story:
      "Dr. Ellie Arroway discovers a mysterious signal that could prove humanity is not alone in the universe.",
    director: "Robert Zemeckis",
    cast: [
      "Jodie Foster",
      "Matthew McConaughey",
      "Tom Skerritt",
      "James Woods",
    ],
    language: "English",
    country: "United States",
    trailer: "https://www.youtube.com/watch?v=Q399v-pMG30",
    colors: {
      primary: "#070B1C",
      secondary: "#172A55",
      accent: "#758CFF",
    },
    reviews: [],
  },
];

export default movies;