
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Movies.module.css";
import fallback from "../../assets/fallback1.jpg";
 
export default function MovieCard({ movie, onClick }) {
  const navigate = useNavigate();
 
  const posterUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : fallback;
 
  const handleImgError = (e) => { e.currentTarget.src = fallback; };
 
  const handleClick = (e) => {
    // prevent double triggers if nested handlers
    e?.stopPropagation?.();
 
    if (typeof onClick === "function") {
      // parent wants to control (Confirm modal, etc.)
      onClick(movie);
    } else {
      // default: go to details page
      navigate(`/movie/${movie.id}`);
    }
  };
 
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };
 
  return (
    <div
      className={styles.movieCard}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={movie?.title ? `Open ${movie.title}` : "Open movie"}
    >
      <img
        className={styles.movieImage}
        src={posterUrl}
        alt={movie?.title || "Movie Poster"}
        onError={handleImgError}
        loading="lazy"
      />
 
      <div className={styles.cardContent}>
        <h3>{movie?.title || "Untitled Movie"}</h3>
        <p className={styles.releaseDate}>{movie?.release_date || "Unknown"}</p>
        <p className={styles.overview}>
          {movie?.overview ? (movie.overview.length > 90 ? movie.overview.slice(0, 90) + "..." : movie.overview) : "No description available"}
        </p>
      </div>
    </div>
  );
}