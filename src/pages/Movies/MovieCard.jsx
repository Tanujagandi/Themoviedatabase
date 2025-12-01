import React from "react";
import styles from "./Movies.module.css";
 
import fallback1 from "../../assets/fallback1.jpg";
import fallback2 from "../../assets/fallback2.jpg";
import fallback3 from "../../assets/fallback3.jpg";
import fallback4 from "../../assets/fallback4.jpg";
 
const fallbackImages = [fallback1, fallback2, fallback3, fallback4];
 
export default function MovieCard({ movie, onClick }) {
  const randomFallback =
    fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
 
  const posterUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : randomFallback;
 
  const handleError = (e) => {
    e.target.src = randomFallback;
  };
 
  return (
    <div
      className={styles.movieCard}
      onClick={() => onClick && onClick(movie)}
    >
      <img
        src={posterUrl}
        alt={movie?.title || "Movie Poster"}
        className={styles.movieImage}
        onError={handleError}
      />
 
      <div className={styles.cardContent}>
        <h3>{movie?.title || "Untitled Movie"}</h3>
        <p>{movie?.release_date || "Unknown"}</p>
        <p className={styles.overview}>
          {movie?.overview
            ? movie.overview.slice(0, 70) + "..."
            : "No description available"}
        </p>
      </div>
    </div>
  );
}
 