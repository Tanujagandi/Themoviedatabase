
import React from "react";
import { useOutletContext } from "react-router-dom";
import styles from "./MovieDetails.module.css";
 
/**
 * Overview tab for Movie Details page.
 * Expects `movie` to be provided via Outlet context in MovieDetails.jsx
 */
export default function Overview() {
  const context = useOutletContext();
  const movie = context?.movie || null;
 
  if (!movie) {
    return <div className={styles.overview}><p>No movie data available.</p></div>;
  }
 
  const formatCurrency = (n) => {
    if (!n) return "—";
    try {
      return `$${Number(n).toLocaleString()}`;
    } catch {
      return `$${n}`;
    }
  };
 
  return (
    <div className={styles.overview}>
      <h3>Overview</h3>
      <p className={styles.overviewText}>
        {movie.overview || "No overview available for this movie."}
      </p>
 
      <div className={styles.extra}>
        <p><strong>Genres:</strong> {movie.genres && movie.genres.length > 0 ? movie.genres.map(g => g.name).join(", ") : "—"}</p>
 
        <p><strong>Release Date:</strong> {movie.release_date || "—"}</p>
 
        <p><strong>Runtime:</strong> {movie.runtime ? `${movie.runtime} min` : "—"}</p>
 
        <p><strong>Original Language:</strong> {movie.original_language ? movie.original_language.toUpperCase() : "—"}</p>
 
        <p><strong>Budget:</strong> {formatCurrency(movie.budget)}</p>
 
        <p><strong>Revenue:</strong> {formatCurrency(movie.revenue)}</p>
      </div>
    </div>
  );
}
 