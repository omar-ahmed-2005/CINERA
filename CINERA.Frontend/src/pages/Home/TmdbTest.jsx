import React, { useEffect, useState } from "react";
import { searchMovie, getPosterUrl } from "../../services/tmdb";

const TmdbTest = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const test = async () => {
      try {
        const result = await searchMovie("Interstellar");
        console.log("TMDB RESULT:", result);
        setMovie(result);
      } catch (error) {
        console.error(error);
      }
    };

    test();
  }, []);

  return (
    <div>
      <h1>TMDB Test</h1>

      {movie && (
        <div>
          <h2>{movie.title}</h2>

          <img
            src={getPosterUrl(movie.poster_path)}
            alt={movie.title}
            width="300"
          />

          <p>{movie.overview}</p>
        </div>
      )}
    </div>
  );
};

export default TmdbTest;